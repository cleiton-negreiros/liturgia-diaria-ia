"""
Portuguese readings scraper.
Source: https://www.oraetlabora.com.br/api/liturgia (Ora et Labora)
This API provides daily mass readings in Portuguese from Canção Nova/CNBB.
"""

import httpx
from datetime import date
from typing import Optional

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
    url = "https://www.oraetlabora.com.br/api/liturgia"

    async with httpx.AsyncClient(
        timeout=30.0,
        follow_redirects=True,
        headers={"User-Agent": "LiturgiaDiariaIA/1.0"},
    ) as client:
        response = await client.get(url)
        response.raise_for_status()
        data = response.json()

    return _parse_oraetlabora_response(data, target_date or date.today())


def _parse_oraetlabora_response(data: dict, target_date: date) -> DailyReadings:
    """Parse the oraetlabora API response into our model."""
    readings = []

    color_map = {
        "branco": LiturgicalColor.WHITE,
        "vermelho": LiturgicalColor.RED,
        "verde": LiturgicalColor.GREEN,
        "roxo": LiturgicalColor.PURPLE,
        "rosa": LiturgicalColor.ROSE,
        "preto": LiturgicalColor.BLACK,
    }

    if data.get("leituras"):
        for leitura in data["leituras"]:
            tipo = leitura.get("tipo", "").lower()
            reading_type = None

            if "1" in tipo or "primeira" in tipo:
                reading_type = ReadingType.FIRST_READING
            elif "salmo" in tipo:
                reading_type = ReadingType.PSALM
            elif "2" in tipo or "segunda" in tipo:
                reading_type = ReadingType.SECOND_READING
            elif "evangelho" in tipo:
                reading_type = ReadingType.GOSPEL
            elif "aleluia" in tipo:
                reading_type = ReadingType.GOSPEL_ACCLAMATION

            if reading_type:
                readings.append(
                    Reading(
                        type=reading_type,
                        reference=leitura.get("referencia", ""),
                        text=leitura.get("texto", ""),
                    )
                )

    liturgical_day = LiturgicalDay(
        date=target_date,
        name=data.get("diaSemana", ""),
        color=color_map.get(
            data.get("corLiturgica", "").lower(), LiturgicalColor.GREEN
        ),
        rank=LiturgicalRank.FERIA,
        season=data.get("tempoLiturgico", ""),
    )

    return DailyReadings(
        date=target_date,
        language=Language.PORTUGUESE,
        liturgical_day=liturgical_day,
        title=f"{data.get('diaSemana', '')} - {data.get('tempoLiturgico', '')}",
        readings=readings,
        source="oraetlabora.com.br",
    )
