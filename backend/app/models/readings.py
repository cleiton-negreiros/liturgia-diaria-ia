from datetime import date
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class Language(str, Enum):
    PORTUGUESE = "pt"
    ENGLISH = "en"
    SPANISH = "es"
    ITALIAN = "it"


class ReadingType(str, Enum):
    FIRST_READING = "first_reading"
    PSALM = "psalm"
    SECOND_READING = "second_reading"
    GOSPEL = "gospel"
    GOSPEL_ACCLAMATION = "gospel_acclamation"


class LiturgicalColor(str, Enum):
    WHITE = "white"
    RED = "red"
    GREEN = "green"
    PURPLE = "purple"
    ROSE = "rose"
    BLACK = "black"


class LiturgicalRank(str, Enum):
    SOLEMNITY = "solemnity"
    FEAST = "feast"
    MEMORIAL = "memorial"
    OPTIONAL_MEMORIAL = "optional_memorial"
    FERIA = "feria"
    SUNDAY = "sunday"


class Reading(BaseModel):
    """Single scripture reading."""

    type: ReadingType
    reference: str
    text: str
    responsorial: Optional[str] = None


class LiturgicalDay(BaseModel):
    """Liturgical day information."""

    date: date
    name: str
    color: LiturgicalColor
    rank: LiturgicalRank
    season: str
    week: Optional[int] = None
    cycle: Optional[str] = None  # A, B, C for Sundays


class DailyReadings(BaseModel):
    """Complete daily mass readings."""

    date: date
    language: Language
    liturgical_day: Optional[LiturgicalDay] = None
    title: str
    readings: list[Reading]
    source: str
    scraped_at: Optional[str] = None


class Prayer(BaseModel):
    """Catholic prayer."""

    id: str
    title: str
    language: Language
    category: str
    content: str
    source: Optional[str] = None


class BibleBook(BaseModel):
    """Bible book information."""

    name: str
    abbreviation: str
    testament: str  # old or new
    chapters: int


class BiblePassage(BaseModel):
    """Bible passage with text."""

    reference: str
    book: str
    chapter: int
    verses: str
    text: str
    language: Language


class ApiResponse(BaseModel):
    """Generic API response wrapper."""

    success: bool
    data: Optional[dict] = None
    error: Optional[str] = None
    message: Optional[str] = None
