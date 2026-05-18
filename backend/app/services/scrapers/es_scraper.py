"""
Spanish readings scraper.
Source: https://www.ewtn.com/es/catolicismo/lecturas (EWTN Spanish)
EWTN provides daily mass readings in Spanish.
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


async def fetch_spanish_readings(
    target_date: Optional[date] = None,
) -> DailyReadings:
    """
    Fetch daily mass readings in Spanish from EWTN.

    Args:
        target_date: Date to fetch readings for. Defaults to today.

    Returns:
        DailyReadings object with all readings for the day.
    """
    settings = get_settings()
    target = target_date or date.today()

    # EWTN URL format - they typically show current day's readings
    url = settings.ewtn_url

    async with httpx.AsyncClient(
        timeout=30.0,
        follow_redirects=True,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        },
    ) as client:
        response = await client.get(url)
        response.raise_for_status()
        html = response.text

    return _parse_ewtn_html(html, target)


def _parse_ewtn_html(html: str, target_date: date) -> DailyReadings:
    """Parse EWTN HTML page into our model."""
    soup = BeautifulSoup(html, "lxml")
    readings = []

    # EWTN structures readings in article/content sections
    content = soup.find("div", class_="content") or soup.find("article")

    if content:
        # Find reading sections
        reading_divs = content.find_all(["h3", "h4"])

        for heading in reading_divs:
            title = heading.get_text(strip=True)
            reading_type = _determine_reading_type(title)

            if reading_type:
                # Get the text content after the heading
                text_parts = []
                sibling = heading.find_next_sibling()
                while sibling and sibling.name not in ["h3", "h4"]:
                    if sibling.name in ["p", "div"]:
                        text_parts.append(sibling.get_text(strip=True))
                    sibling = sibling.find_next_sibling()

                if text_parts:
                    readings.append(
                        Reading(
                            type=reading_type,
                            reference=title,
                            text="\n\n".join(text_parts),
                        )
                    )

    # If no structured readings found, try alternative parsing
    if not readings:
        readings = _fallback_parse(soup)

    # Extract liturgical info
    liturgical_day = _extract_liturgical_info(soup, target_date)

    # Get date/celebration from page
    date_elem = soup.find("time") or soup.find("span", class_="date")
    celebration = date_elem.get_text(strip=True) if date_elem else f"Lecturas del día {target_date}"

    return DailyReadings(
        date=target_date,
        language=Language.SPANISH,
        liturgical_day=liturgical_day,
        title=celebration,
        readings=readings,
        source="ewtn.com/es",
    )


def _determine_reading_type(title: str) -> Optional[ReadingType]:
    """Determine reading type from Spanish section title."""
    title_lower = title.lower()

    if "primera lectura" in title_lower:
        return ReadingType.FIRST_READING
    elif "salmo" in title_lower or "salmo responsorial" in title_lower:
        return ReadingType.PSALM
    elif "segunda lectura" in title_lower:
        return ReadingType.SECOND_READING
    elif "evangelio" in title_lower or "santo evangelio" in title_lower:
        return ReadingType.GOSPEL
    elif "aleluya" in title_lower:
        return ReadingType.GOSPEL_ACCLAMATION

    return None


def _fallback_parse(soup: BeautifulSoup) -> list[Reading]:
    """Fallback parsing method for EWTN pages."""
    readings = []

    # Try to find readings in main content area
    main_content = soup.find("main") or soup.find("div", id="content")
    if main_content:
        paragraphs = main_content.find_all("p")
        current_type = None
        current_ref = None
        current_text = []

        for p in paragraphs:
            text = p.get_text(strip=True)
            if not text:
                continue

            # Check if this is a reading header
            reading_type = _determine_reading_type(text)
            if reading_type:
                # Save previous reading if exists
                if current_type and current_text:
                    readings.append(
                        Reading(
                            type=current_type,
                            reference=current_ref or "",
                            text="\n\n".join(current_text),
                        )
                    )
                current_type = reading_type
                current_ref = text
                current_text = []
            elif current_type:
                current_text.append(text)

        # Don't forget the last reading
        if current_type and current_text:
            readings.append(
                Reading(
                    type=current_type,
                    reference=current_ref or "",
                    text="\n\n".join(current_text),
                )
            )

    return readings


def _extract_liturgical_info(soup: BeautifulSoup, target_date: date) -> Optional[LiturgicalDay]:
    """Extract liturgical information from the page."""
    # Look for liturgical season indicators
    season_indicators = {
        "adviento": ("Adviento", LiturgicalColor.PURPLE),
        "navidad": ("Navidad", LiturgicalColor.WHITE),
        "cuaresma": ("Cuaresma", LiturgicalColor.PURPLE),
        "pascua": ("Pascua", LiturgicalColor.WHITE),
        "tiempo ordinario": ("Tiempo Ordinario", LiturgicalColor.GREEN),
    }

    page_text = soup.get_text().lower()

    for key, (season, color) in season_indicators.items():
        if key in page_text:
            return LiturgicalDay(
                date=target_date,
                name="",
                color=color,
                rank=LiturgicalRank.FERIA,
                season=season,
            )

    return None
