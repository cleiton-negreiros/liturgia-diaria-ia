# -*- coding: utf-8 -*-
from fastapi import APIRouter, HTTPException, Query
from typing import Optional

from app.models.readings import Language

router = APIRouter(prefix="/api/bible", tags=["bible"])

# Bible books reference data (Portuguese)
BIBLE_BOOKS = {
    "pt": {
        "old_testament": [
            {"name": "Genesis", "abbr": "Gn", "chapters": 50},
            {"name": "Exodo", "abbr": "Ex", "chapters": 40},
            {"name": "Levitico", "abbr": "Lv", "chapters": 27},
            {"name": "Numeros", "abbr": "Nm", "chapters": 36},
            {"name": "Deuteronomio", "abbr": "Dt", "chapters": 34},
            {"name": "Josue", "abbr": "Js", "chapters": 24},
            {"name": "Juizes", "abbr": "Jz", "chapters": 21},
            {"name": "Rute", "abbr": "Rt", "chapters": 4},
            {"name": "1 Samuel", "abbr": "1Sm", "chapters": 31},
            {"name": "2 Samuel", "abbr": "2Sm", "chapters": 24},
            {"name": "1 Reis", "abbr": "1Rs", "chapters": 22},
            {"name": "2 Reis", "abbr": "2Rs", "chapters": 25},
            {"name": "1 Cronicas", "abbr": "1Cr", "chapters": 29},
            {"name": "2 Cronicas", "abbr": "2Cr", "chapters": 36},
            {"name": "Esdras", "abbr": "Esd", "chapters": 10},
            {"name": "Neemias", "abbr": "Ne", "chapters": 13},
            {"name": "Tobias", "abbr": "Tb", "chapters": 14},
            {"name": "Judite", "abbr": "Jdt", "chapters": 16},
            {"name": "Ester", "abbr": "Est", "chapters": 10},
            {"name": "1 Macabeus", "abbr": "1Mc", "chapters": 16},
            {"name": "2 Macabeus", "abbr": "2Mc", "chapters": 15},
            {"name": "Jo", "abbr": "Jo", "chapters": 42},
            {"name": "Salmos", "abbr": "Sl", "chapters": 150},
            {"name": "Proverbios", "abbr": "Prov", "chapters": 31},
            {"name": "Eclesiastes", "abbr": "Ecl", "chapters": 12},
            {"name": "Cantico dos Canticos", "abbr": "Ct", "chapters": 8},
            {"name": "Sabedoria", "abbr": "Sab", "chapters": 19},
            {"name": "Eclesiastico", "abbr": "Eclo", "chapters": 51},
            {"name": "Isaias", "abbr": "Is", "chapters": 66},
            {"name": "Jeremias", "abbr": "Jr", "chapters": 52},
            {"name": "Lamentacoes", "abbr": "Lm", "chapters": 5},
            {"name": "Baruc", "abbr": "Br", "chapters": 6},
            {"name": "Ezequiel", "abbr": "Ez", "chapters": 48},
            {"name": "Daniel", "abbr": "Dn", "chapters": 14},
            {"name": "Oseias", "abbr": "Os", "chapters": 14},
            {"name": "Joel", "abbr": "Jl", "chapters": 4},
            {"name": "Amos", "abbr": "Am", "chapters": 9},
            {"name": "Abdias", "abbr": "Abd", "chapters": 1},
            {"name": "Jonas", "abbr": "Jon", "chapters": 4},
            {"name": "Miqueias", "abbr": "Mq", "chapters": 7},
            {"name": "Naum", "abbr": "Na", "chapters": 3},
            {"name": "Habacuc", "abbr": "Hab", "chapters": 3},
            {"name": "Sofonias", "abbr": "Sf", "chapters": 3},
            {"name": "Ageu", "abbr": "Ag", "chapters": 2},
            {"name": "Zacarias", "abbr": "Zc", "chapters": 14},
            {"name": "Malaquias", "abbr": "Ml", "chapters": 3},
        ],
        "new_testament": [
            {"name": "Mateus", "abbr": "Mt", "chapters": 28},
            {"name": "Marcos", "abbr": "Mc", "chapters": 16},
            {"name": "Lucas", "abbr": "Lc", "chapters": 24},
            {"name": "Joao", "abbr": "Jo", "chapters": 21},
            {"name": "Atos dos Apostolos", "abbr": "At", "chapters": 28},
            {"name": "Romanos", "abbr": "Rm", "chapters": 16},
            {"name": "1 Corintios", "abbr": "1Cor", "chapters": 16},
            {"name": "2 Corintios", "abbr": "2Cor", "chapters": 13},
            {"name": "Galatas", "abbr": "Gl", "chapters": 6},
            {"name": "Efesios", "abbr": "Ef", "chapters": 6},
            {"name": "Filipenses", "abbr": "Fl", "chapters": 4},
            {"name": "Colossenses", "abbr": "Cl", "chapters": 4},
            {"name": "1 Tessalonicenses", "abbr": "1Ts", "chapters": 5},
            {"name": "2 Tessalonicenses", "abbr": "2Ts", "chapters": 3},
            {"name": "1 Timoteo", "abbr": "1Tm", "chapters": 6},
            {"name": "2 Timoteo", "abbr": "2Tm", "chapters": 4},
            {"name": "Tito", "abbr": "Tt", "chapters": 3},
            {"name": "Filemom", "abbr": "Fm", "chapters": 1},
            {"name": "Hebreus", "abbr": "Hb", "chapters": 13},
            {"name": "Tiago", "abbr": "Tg", "chapters": 5},
            {"name": "1 Pedro", "abbr": "1Pd", "chapters": 5},
            {"name": "2 Pedro", "abbr": "2Pd", "chapters": 3},
            {"name": "1 Joao", "abbr": "1Jo", "chapters": 5},
            {"name": "2 Joao", "abbr": "2Jo", "chapters": 1},
            {"name": "3 Joao", "abbr": "3Jo", "chapters": 1},
            {"name": "Judas", "abbr": "Jd", "chapters": 1},
            {"name": "Apocalipse", "abbr": "Ap", "chapters": 22},
        ],
    },
}

# Display names with proper accents (used by frontend)
BIBLE_DISPLAY_NAMES = {
    "Genesis": "Genesis",
    "Exodo": "Exodo",
    "Levitico": "Levitico",
    "Numeros": "Numeros",
    "Deuteronomio": "Deuteronomio",
    "Josue": "Josue",
    "Juizes": "Juizes",
    "Cronicas": "Cronicas",
    "Jo": "Jo",
    "Proverbios": "Proverbios",
    "Cantico dos Canticos": "Cantico dos Canticos",
    "Eclesiastico": "Eclesiastico",
    "Isaias": "Isaias",
    "Lamentacoes": "Lamentacoes",
    "Amos": "Amos",
    "Joao": "Joao",
    "Atos dos Apostolos": "Atos dos Apostolos",
    "Corintios": "Corintios",
    "Galatas": "Galatas",
    "Efesios": "Efesios",
    "Tessalonicenses": "Tessalonicenses",
    "Timoteo": "Timoteo",
}


def get_display_name(name: str) -> str:
    """Get display name with proper accents."""
    return BIBLE_DISPLAY_NAMES.get(name, name)


@router.get("/books", response_model=dict)
async def get_bible_books(
    lang: Language = Query(Language.PORTUGUESE, description="Language code: pt, en, es, it"),
    testament: Optional[str] = Query(None, description="Filter by testament: old or new"),
):
    """Get list of Bible books in the specified language."""
    # Fallback to Portuguese if language not available
    books_data = BIBLE_BOOKS.get(lang.value, BIBLE_BOOKS.get("pt", {}))
    result = []

    if testament == "old" or testament is None:
        for book in books_data.get("old_testament", []):
            result.append({
                "name": get_display_name(book["name"]),
                "abbr": book["abbr"],
                "chapters": book["chapters"],
                "testament": "old"
            })

    if testament == "new" or testament is None:
        for book in books_data.get("new_testament", []):
            result.append({
                "name": get_display_name(book["name"]),
                "abbr": book["abbr"],
                "chapters": book["chapters"],
                "testament": "new"
            })

    return {
        "success": True,
        "data": result,
        "count": len(result),
    }


@router.get("/passage", response_model=dict)
async def get_bible_passage(
    book: str = Query(..., description="Book name or abbreviation"),
    chapter: int = Query(..., description="Chapter number"),
    verses: Optional[str] = Query(None, description="Verse(s), e.g., '1-10' or '1,3,5'"),
    lang: Language = Query(Language.PORTUGUESE, description="Language code: pt, en, es, it"),
):
    """
    Get a Bible passage.

    Note: This endpoint provides reference data. For full Bible text,
    integrate with a Bible API like API.Bible or Bible Gateway API.
    """
    # Find the book
    books_data = BIBLE_BOOKS.get(lang.value, {})
    all_books = books_data.get("old_testament", []) + books_data.get("new_testament", [])

    found_book = None
    for b in all_books:
        if b["name"].lower() == book.lower() or b["abbr"].lower() == book.lower():
            found_book = b
            break

    if not found_book:
        raise HTTPException(status_code=404, detail=f"Book '{book}' not found")

    if chapter > found_book["chapters"]:
        raise HTTPException(
            status_code=400,
            detail=f"Book '{found_book['name']}' has only {found_book['chapters']} chapters",
        )

    reference = f"{get_display_name(found_book['name'])} {chapter}"
    if verses:
        reference += f":{verses}"

    return {
        "success": True,
        "data": {
            "reference": reference,
            "book": get_display_name(found_book["name"]),
            "chapter": chapter,
            "verses": verses or "all",
            "language": lang.value,
            "note": "Full text requires Bible API integration. Use API.Bible or similar service.",
        },
    }
