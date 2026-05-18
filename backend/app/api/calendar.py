import httpx
from datetime import date
from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from app.config import get_settings

router = APIRouter(prefix="/api/calendar", tags=["calendar"])


@router.get("/", response_model=dict)
async def get_liturgical_calendar(
    year: Optional[int] = Query(None, description="Year (defaults to current year)"),
    nation: Optional[str] = Query(None, description="Nation code for national calendar"),
):
    """
    Get the Roman Catholic liturgical calendar.

    Uses the Liturgical Calendar API (https://litcal.johnromanodorazio.com/)
    """
    settings = get_settings()
    target_year = year or date.today().year

    url = f"{settings.liturgical_calendar_url}/api/calendar"
    if nation:
        url = f"{settings.liturgical_calendar_url}/api/calendar/nation/{nation}"

    url = f"{url}/{target_year}"

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(url)
            if response.status_code != 200:
                raise HTTPException(status_code=502, detail="Error fetching calendar from external API")
            
            content_type = response.headers.get("content-type", "")
            if "application/json" not in content_type:
                # Fallback to basic calendar data if external API fails
                return {
                    "success": True,
                    "data": {
                        "year": target_year,
                        "source": "fallback",
                        "seasons": [
                            {"name": "Advent", "color": "purple", "start": "Late November", "end": "December 24"},
                            {"name": "Christmas", "color": "white", "start": "December 25", "end": "January"},
                            {"name": "Lent", "color": "purple", "start": "Ash Wednesday", "end": "Holy Thursday"},
                            {"name": "Easter", "color": "white", "start": "Easter Sunday", "end": "Pentecost"},
                            {"name": "Ordinary Time", "color": "green", "start": "After Baptism of Lord", "end": "Advent"},
                        ]
                    },
                }
            
            data = response.json()
    except httpx.RequestError as e:
        # Fallback to basic calendar data
        return {
            "success": True,
            "data": {
                "year": target_year,
                "source": "fallback",
                "seasons": [
                    {"name": "Advent", "color": "purple", "start": "Late November", "end": "December 24"},
                    {"name": "Christmas", "color": "white", "start": "December 25", "end": "January"},
                    {"name": "Lent", "color": "purple", "start": "Ash Wednesday", "end": "Holy Thursday"},
                    {"name": "Easter", "color": "white", "start": "Easter Sunday", "end": "Pentecost"},
                    {"name": "Ordinary Time", "color": "green", "start": "After Baptism of Lord", "end": "Advent"},
                ]
            },
        }
    except ValueError as e:
        # Fallback to basic calendar data
        return {
            "success": True,
            "data": {
                "year": target_year,
                "source": "fallback",
                "seasons": [
                    {"name": "Advent", "color": "purple", "start": "Late November", "end": "December 24"},
                    {"name": "Christmas", "color": "white", "start": "December 25", "end": "January"},
                    {"name": "Lent", "color": "purple", "start": "Ash Wednesday", "end": "Holy Thursday"},
                    {"name": "Easter", "color": "white", "start": "Easter Sunday", "end": "Pentecost"},
                    {"name": "Ordinary Time", "color": "green", "start": "After Baptism of Lord", "end": "Advent"},
                ]
            },
        }

    return {
        "success": True,
        "data": data,
    }


@router.get("/today", response_model=dict)
async def get_todays_liturgy():
    """Get today's liturgical information."""
    settings = get_settings()
    today = date.today()

    url = f"{settings.liturgical_calendar_url}/api/calendar/{today.year}"

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(url)
            if response.status_code != 200:
                raise HTTPException(status_code=502, detail="Error fetching calendar")
            
            content_type = response.headers.get("content-type", "")
            if "application/json" not in content_type:
                raise HTTPException(status_code=502, detail="External API returned non-JSON response")
            
            data = response.json()
    except httpx.RequestError as e:
        raise HTTPException(status_code=502, detail=f"Error connecting to calendar API: {str(e)}")
    except ValueError as e:
        raise HTTPException(status_code=502, detail=f"Error parsing calendar data: {str(e)}")

    # Find today's entry
    today_str = today.isoformat()
    today_liturgy = None

    if isinstance(data, list):
        for entry in data:
            if entry.get("date") == today_str:
                today_liturgy = entry
                break
    elif isinstance(data, dict):
        today_liturgy = data.get(today_str)

    return {
        "success": True,
        "data": {
            "date": today_str,
            "liturgy": today_liturgy,
        },
    }
