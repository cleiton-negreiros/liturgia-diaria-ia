# API Documentation

## Base URL

```
http://localhost:8000
```

## Authentication

Currently, the API is open and does not require authentication.

## Endpoints

### Readings

#### Get Daily Readings

```
GET /api/readings/
```

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| lang | string | No | pt | Language code: pt, en, es, it |
| date_str | string | No | today | Date in YYYY-MM-DD format |

**Example:**

```bash
curl "http://localhost:8000/api/readings/?lang=en&date_str=2026-05-18"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "date": "2026-05-18",
    "language": "en",
    "liturgical_day": {
      "date": "2026-05-18",
      "name": "Monday of the Sixth Week of Easter",
      "color": "white",
      "rank": "feria",
      "season": "Easter"
    },
    "title": "Monday of the Sixth Week of Easter",
    "readings": [
      {
        "type": "first_reading",
        "reference": "Acts 16:11-15",
        "text": "..."
      },
      {
        "type": "psalm",
        "reference": "Psalm 149:1b-2, 3-4, 5-6a and 9b",
        "text": "...",
        "responsorial": "The Lord takes delight in his people."
      },
      {
        "type": "gospel",
        "reference": "John 15:26-16:4a",
        "text": "..."
      }
    ],
    "source": "bible.usccb.org"
  }
}
```

#### Get Today's Readings

```
GET /api/readings/today
```

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| lang | string | No | pt | Language code: pt, en, es, it |

#### Get All Languages

```
GET /api/readings/all-languages
```

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| date_str | string | No | today | Date in YYYY-MM-DD format |

---

### Prayers

#### Get All Prayers

```
GET /api/prayers/
```

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| lang | string | No | pt | Language code: pt, en, es, it |
| category | string | No | - | Filter: traditional, devotion, novena |

**Example:**

```bash
curl "http://localhost:8000/api/prayers/?lang=en&category=traditional"
```

#### Get Specific Prayer

```
GET /api/prayers/{prayer_id}
```

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| prayer_id | string | Prayer ID (e.g., our_father, hail_mary) |

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| lang | string | No | pt | Language code |

#### Get Categories

```
GET /api/prayers/categories
```

---

### Bible

#### Get Bible Books

```
GET /api/bible/books
```

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| lang | string | No | pt | Language code |
| testament | string | No | - | Filter: old, new |

#### Get Bible Passage

```
GET /api/bible/passage
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| book | string | Yes | Book name or abbreviation |
| chapter | integer | Yes | Chapter number |
| verses | string | No | Verse(s), e.g., "1-10" |
| lang | string | No | Language code |

---

### Calendar

#### Get Liturgical Calendar

```
GET /api/calendar/
```

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| year | integer | No | current | Year |
| nation | string | No | - | Nation code |

#### Get Today's Liturgy

```
GET /api/calendar/today
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message",
  "message": "Additional details"
}
```

**HTTP Status Codes:**

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |
| 502 | Bad Gateway (external API error) |

---

## Interactive Documentation

FastAPI provides interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
