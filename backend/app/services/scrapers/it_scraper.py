"""
Italian readings scraper.
Source: https://www.dailyreadings.eu/it (Daily Readings EU)
Supports multiple liturgical rites and languages.
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


async def fetch_italian_readings(
    target_date: Optional[date] = None,
) -> DailyReadings:
    """
    Fetch daily mass readings in Italian from Daily Readings EU.

    Args:
        target_date: Date to fetch readings for. Defaults to today.

    Returns:
        DailyReadings object with all readings for the day.
    """
    settings = get_settings()
    target = target_date or date.today()

    # DailyReadings EU URL format
    url = f"{settings.dailyreadings_url}/it"

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

    return _parse_dailyreadings_html(html, target)


def _parse_dailyreadings_html(html: str, target_date: date) -> DailyReadings:
    """Parse Daily Readings EU HTML page into our model."""
    soup = BeautifulSoup(html, "lxml")
    readings = []

    # Look for reading sections
    # DailyReadings typically uses specific class names
    reading_sections = soup.find_all(["div", "section"], class_=lambda c: c and "reading" in c.lower())

    if not reading_sections:
        # Try alternative selectors
        reading_sections = soup.find_all("div", class_=lambda c: c and ("lettura" in c.lower() or "read" in c.lower()))

    for section in reading_sections:
        title_elem = section.find(["h2", "h3", "h4"])
        content_elem = section.find(["p", "div"], class_=lambda c: c and "text" in c.lower()) if section else None

        if title_elem:
            title = title_elem.get_text(strip=True)
            text = content_elem.get_text(strip=True) if content_elem else section.get_text(strip=True)

            reading_type = _determine_reading_type(title)
            if reading_type:
                readings.append(
                    Reading(
                        type=reading_type,
                        reference=title,
                        text=text,
                    )
                )

    # Fallback: parse from general content
    if not readings:
        readings = _fallback_parse(soup)

    # Extract liturgical info
    liturgical_day = _extract_liturgical_info(soup, target_date)

    # Get celebration title
    title_elem = soup.find("h1") or soup.find("title")
    celebration = title_elem.get_text(strip=True) if title_elem else f"Letture del giorno {target_date}"

    return DailyReadings(
        date=target_date,
        language=Language.ITALIAN,
        liturgical_day=liturgical_day,
        title=celebration,
        readings=readings,
        source="dailyreadings.eu",
    )


def _determine_reading_type(title: str) -> Optional[ReadingType]:
    """Determine reading type from Italian section title."""
    title_lower = title.lower()

    if "prima lettura" in title_lower:
        return ReadingType.FIRST_READING
    elif "salmo" in title_lower or "salmo responsoriale" in title_lower:
        return ReadingType.PSALM
    elif "seconda lettura" in title_lower:
        return ReadingType.SECOND_READING
    elif "vangelo" in title_lower:
        return ReadingType.GOSPEL
    elif "alleluia" in title_lower:
        return ReadingType.GOSPEL_ACCLAMATION

    return None


def _fallback_parse(soup: BeautifulSoup) -> list[Reading]:
    """Fallback parsing method for Italian readings."""
    readings = []

    main_content = soup.find("main") or soup.find("div", id="content") or soup.find("article")
    if main_content:
        headings = main_content.find_all(["h2", "h3", "h4"])

        current_type = None
        current_ref = None
        current_text = []

        for heading in headings:
            title = heading.get_text(strip=True)
            reading_type = _determine_reading_type(title)

            if reading_type:
                # Save previous reading
                if current_type and current_text:
                    readings.append(
                        Reading(
                            type=current_type,
                            reference=current_ref or "",
                            text="\n\n".join(current_text),
                        )
                    )
                current_type = reading_type
                current_ref = title
                current_text = []

            # Collect text until next heading
            sibling = heading.find_next_sibling()
            while sibling and sibling.name not in ["h2", "h3", "h4"]:
                if sibling.name in ["p", "div"]:
                    text = sibling.get_text(strip=True)
                    if text:
                        current_text.append(text)
                sibling = sibling.find_next_sibling()

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
    season_indicators = {
        "avvento": ("Avvento", LiturgicalColor.PURPLE),
        "natale": ("Natale", LiturgicalColor.WHITE),
        "quaresima": ("Quaresima", LiturgicalColor.PURPLE),
        "pasqua": ("Pasqua", LiturgicalColor.WHITE),
        "tempo ordinario": ("Tempo Ordinario", LiturgicalColor.GREEN),
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
