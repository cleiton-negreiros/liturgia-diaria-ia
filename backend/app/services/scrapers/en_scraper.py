"""
English readings scraper.
Source: https://bible.usccb.org/bible/readings/ (USCCB)
This is the official United States Conference of Catholic Bishops website.
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


async def fetch_english_readings(
    target_date: Optional[date] = None,
) -> DailyReadings:
    """
    Fetch daily mass readings in English from USCCB.

    Args:
        target_date: Date to fetch readings for. Defaults to today.

    Returns:
        DailyReadings object with all readings for the day.
    """
    settings = get_settings()
    target = target_date or date.today()

    # USCCB URL format: /bible/readings/MM/DD/yy
    url = f"{settings.usccb_url}/{target.month:02d}/{target.day:02d}/{target.year % 100:02d}"

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

    return _parse_usccb_html(html, target)


def _parse_usccb_html(html: str, target_date: date) -> DailyReadings:
    """Parse USCCB HTML page into our model."""
    soup = BeautifulSoup(html, "lxml")
    readings = []

    # Find all reading sections
    reading_sections = soup.find_all("div", class_="views-row")

    for section in reading_sections:
        title_elem = section.find("h2", class_="title")
        content_elem = section.find("div", class_="field")

        if not title_elem or not content_elem:
            continue

        title = title_elem.get_text(strip=True)
        text = content_elem.get_text(strip=True)

        # Determine reading type from title
        reading_type = _determine_reading_type(title)
        if reading_type:
            readings.append(
                Reading(
                    type=reading_type,
                    reference=title,
                    text=text,
                )
            )

    # Try to get liturgical info
    liturgical_day = _extract_liturgical_info(soup, target_date)

    # Get page title for celebration name
    page_title = soup.find("h1", class_="page-title")
    celebration_name = page_title.get_text(strip=True) if page_title else f"Daily Readings for {target_date}"

    return DailyReadings(
        date=target_date,
        language=Language.ENGLISH,
        liturgical_day=liturgical_day,
        title=celebration_name,
        readings=readings,
        source="bible.usccb.org",
    )


def _determine_reading_type(title: str) -> Optional[ReadingType]:
    """Determine reading type from the section title."""
    title_lower = title.lower()

    if "first reading" in title_lower:
        return ReadingType.FIRST_READING
    elif "responsorial psalm" in title_lower:
        return ReadingType.PSALM
    elif "second reading" in title_lower:
        return ReadingType.SECOND_READING
    elif "gospel" in title_lower:
        return ReadingType.GOSPEL
    elif "alleluia" in title_lower:
        return ReadingType.GOSPEL_ACCLAMATION

    return None


def _extract_liturgical_info(soup: BeautifulSoup, target_date: date) -> Optional[LiturgicalDay]:
    """Extract liturgical information from the page."""
    # Look for liturgical day info in breadcrumbs or headers
    breadcrumb = soup.find("nav", class_="breadcrumb")
    if breadcrumb:
        links = breadcrumb.find_all("a")
        if links:
            return LiturgicalDay(
                date=target_date,
                name=links[-1].get_text(strip=True) if links else "",
                color=LiturgicalColor.GREEN,  # Default
                rank=LiturgicalRank.FERIA,
                season="",
            )

    return None
