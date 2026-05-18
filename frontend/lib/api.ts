export async function fetchReadings(lang: string, date?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const params = new URLSearchParams({ lang });
  if (date) params.set("date_str", date);

  const url = `${baseUrl}/api/readings/?${params}`;
  console.log("Fetching readings from:", url);

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Backend error:", errorText);
    throw new Error(`Failed to fetch readings: ${response.status} ${errorText}`);
  }

  return response.json();
}

export async function fetchPrayers(lang: string, category?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const params = new URLSearchParams({ lang });
  if (category) params.set("category", category);

  const response = await fetch(`${baseUrl}/api/prayers/?${params}`, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch prayers");
  }

  return response.json();
}

export async function fetchBibleBooks(lang: string, testament?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const params = new URLSearchParams({ lang });
  if (testament) params.set("testament", testament);

  const response = await fetch(`${baseUrl}/api/bible/books?${params}`, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bible books");
  }

  return response.json();
}

export async function fetchCalendar(year?: number) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const params = new URLSearchParams();
  if (year) params.set("year", year.toString());

  const response = await fetch(`${baseUrl}/api/calendar/?${params}`, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch calendar");
  }

  return response.json();
}
