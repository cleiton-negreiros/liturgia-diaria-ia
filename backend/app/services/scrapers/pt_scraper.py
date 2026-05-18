"""
Portuguese readings scraper.
Source: https://liturgia.up.railway.app/v2/ (Dancrf/liturgia-diaria)
This API provides daily mass readings in Portuguese from CNBB.
"""

import httpx
from datetime import date
from typing import Optional
from bs4 import BeautifulSoup

from app.config import get_settings
from app.models.readings import (
    DailyReadings,
    Language,
    LiturgicalDay,
    LiturgicalColor,
    LiturgicalRank,
    Reading,
    ReadingType,
)


async def fetch_portuguese_readings(
    target_date: Optional[date] = None,
) -> DailyReadings:
    """
    Fetch daily mass readings in Portuguese.

    Args:
        target_date: Date to fetch readings for. Defaults to today.

    Returns:
        DailyReadings object with all readings for the day.
    """
    settings = get_settings()
    date_str = target_date.strftime("%Y-%m-%d") if target_date else ""

    url = f"{settings.liturgia_diaria_url}/hoje"
    if date_str:
        url = f"{settings.liturgia_diaria_url}/dia/{date_str}"

    async with httpx.AsyncClient(
        timeout=30.0,
        follow_redirects=True,
        headers={"User-Agent": "LiturgiaDiariaIA/1.0"},
    ) as client:
        response = await client.get(url)
        response.raise_for_status()
        data = response.json()

    return _parse_liturgia_diaria_response(data, date_str or date.today().isoformat())


def _parse_liturgia_diaria_response(data: dict, date_str: str) -> DailyReadings:
    """Parse the liturgia-diaria API response into our model."""
    readings = []

    # Parse first reading
    if data.get("primeira_leitura"):
        readings.append(
            Reading(
                type=ReadingType.FIRST_READING,
                reference=data["primeira_leitura"].get("referencia", ""),
                text=data["primeira_leitura"].get("texto", ""),
            )
        )

    # Parse psalm
    if data.get("salmo"):
        readings.append(
            Reading(
                type=ReadingType.PSALM,
                reference=data["salmo"].get("referencia", ""),
                text=data["salmo"].get("texto", ""),
                responsorial=data["salmo"].get("refrao"),
            )
        )

    # Parse second reading (Sundays and solemnities)
    if data.get("segunda_leitura"):
        readings.append(
            Reading(
                type=ReadingType.SECOND_READING,
                reference=data["segunda_leitura"].get("referencia", ""),
                text=data["segunda_leitura"].get("texto", ""),
            )
        )

    # Parse gospel acclamation
    if data.get("aleluia"):
        readings.append(
            Reading(
                type=ReadingType.GOSPEL_ACCLAMATION,
                reference="Aleluia",
                text=data["aleluia"].get("texto", ""),
            )
        )

    # Parse gospel
    if data.get("evangelho"):
        readings.append(
            Reading(
                type=ReadingType.GOSPEL,
                reference=data["evangelho"].get("referencia", ""),
                text=data["evangelho"].get("texto", ""),
            )
        )

    # Build liturgical day info
    liturgical_day = None
    if data.get("celebracao"):
        color_map = {
            "branco": LiturgicalColor.WHITE,
            "vermelho": LiturgicalColor.RED,
            "verde": LiturgicalColor.GREEN,
            "roxo": LiturgicalColor.PURPLE,
            "rosa": LiturgicalColor.ROSE,
            "preto": LiturgicalColor.BLACK,
        }

        rank_map = {
            "solene": LiturgicalRank.SOLEMNITY,
            "festa": LiturgicalRank.FEAST,
            "memoria": LiturgicalRank.MEMORIAL,
            "memoria facultativa": LiturgicalRank.OPTIONAL_MEMORIAL,
            "domingo": LiturgicalRank.SUNDAY,
        }

        liturgical_day = LiturgicalDay(
            date=date.fromisoformat(date_str),
            name=data["celebracao"].get("nome", ""),
            color=color_map.get(
                data["celebracao"].get("cor", "").lower(), LiturgicalColor.GREEN
            ),
            rank=rank_map.get(
                data["celebracao"].get("tipo", "").lower(), LiturgicalRank.FERIA
            ),
            season=data.get("tempo", ""),
            week=data.get("semana"),
            cycle=data.get("ciclo"),
        )

    return DailyReadings(
        date=date.fromisoformat(date_str),
        language=Language.PORTUGUESE,
        liturgical_day=liturgical_day,
        title=data.get("celebracao", {}).get("nome", f"Liturgia de {date_str}"),
        readings=readings,
        source="liturgia.up.railway.app",
    )
