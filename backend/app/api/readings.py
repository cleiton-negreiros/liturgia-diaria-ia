from datetime import date
from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from app.models.readings import DailyReadings, Language
from app.services.scrapers import pt_scraper, en_scraper, es_scraper, it_scraper

router = APIRouter(prefix="/api/readings", tags=["readings"])


@router.get("/", response_model=dict)
async def get_daily_readings(
    lang: Language = Query(Language.PORTUGUESE, description="Language code: pt, en, es, it"),
    date_str: Optional[str] = Query(None, description="Date in YYYY-MM-DD format (defaults to today)"),
):
    """
    Get daily mass readings for a specific language and date.

    - **lang**: Language code (pt, en, es, it)
    - **date_str**: Optional date in YYYY-MM-DD format
    """
    target_date = None
    if date_str:
        try:
            target_date = date.fromisoformat(date_str)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")

    try:
        if lang == Language.PORTUGUESE:
            readings = await pt_scraper.fetch_portuguese_readings(target_date)
        elif lang == Language.ENGLISH:
            readings = await en_scraper.fetch_english_readings(target_date)
        elif lang == Language.SPANISH:
            readings = await es_scraper.fetch_spanish_readings(target_date)
        elif lang == Language.ITALIAN:
            readings = await it_scraper.fetch_italian_readings(target_date)
        else:
            raise HTTPException(status_code=400, detail="Unsupported language")

        return {
            "success": True,
            "data": readings.model_dump(mode="json"),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching readings: {str(e)}")


@router.get("/today", response_model=dict)
async def get_todays_readings(
    lang: Language = Query(Language.PORTUGUESE, description="Language code: pt, en, es, it"),
):
    """Get today's mass readings for a specific language."""
    return await get_daily_readings(lang=lang, date_str=None)


@router.get("/all-languages", response_model=dict)
async def get_readings_all_languages(
    date_str: Optional[str] = Query(None, description="Date in YYYY-MM-DD format"),
):
    """Get daily mass readings in all supported languages."""
    target_date = None
    if date_str:
        try:
            target_date = date.fromisoformat(date_str)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")

    results = {}
    errors = {}

    for lang in Language:
        try:
            if lang == Language.PORTUGUESE:
                readings = await pt_scraper.fetch_portuguese_readings(target_date)
            elif lang == Language.ENGLISH:
                readings = await en_scraper.fetch_english_readings(target_date)
            elif lang == Language.SPANISH:
                readings = await es_scraper.fetch_spanish_readings(target_date)
            elif lang == Language.ITALIAN:
                readings = await it_scraper.fetch_italian_readings(target_date)

            results[lang.value] = readings.model_dump(mode="json")
        except Exception as e:
            errors[lang.value] = str(e)

    return {
        "success": len(errors) == 0,
        "data": results,
        "errors": errors if errors else None,
    }
