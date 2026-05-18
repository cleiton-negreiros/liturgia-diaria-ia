import BaseLayout from "@/components/base-layout";
import { fetchReadings } from "@/lib/api";
import { BookOpen, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR, enUS, es, it } from "date-fns/locale";

const dateLocales: Record<string, any> = {
  pt: ptBR,
  en: enUS,
  es: es,
  it: it,
};

const readingTypeTranslations: Record<string, Record<string, string>> = {
  pt: {
    first_reading: "Primeira Leitura",
    psalm: "Salmo Responsorial",
    second_reading: "Segunda Leitura",
    gospel_acclamation: "Aclamação ao Evangelho",
    gospel: "Evangelho",
  },
  en: {
    first_reading: "First Reading",
    psalm: "Responsorial Psalm",
    second_reading: "Second Reading",
    gospel_acclamation: "Gospel Acclamation",
    gospel: "Gospel",
  },
  es: {
    first_reading: "Primera Lectura",
    psalm: "Salmo Responsorial",
    second_reading: "Segunda Lectura",
    gospel_acclamation: "Aclamación al Evangelio",
    gospel: "Evangelio",
  },
  it: {
    first_reading: "Prima Lettura",
    psalm: "Salmo Responsoriale",
    second_reading: "Seconda Lettura",
    gospel_acclamation: "Acclamazione al Vangelo",
    gospel: "Vangelo",
  },
};

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function ReadingsPage({ params }: Props) {
  const lang = (await params).lang || "pt";
  const t = readingTypeTranslations[lang] || readingTypeTranslations.pt;
  const locale = dateLocales[lang] || ptBR;

  let readingsData = null;
  let error = null;

  try {
    const result = await fetchReadings(lang);
    readingsData = result.data;
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to fetch readings";
  }

  const today = new Date();
  const formattedDate = format(today, "EEEE, d 'de' MMMM 'de' yyyy", { locale });

  return (
    <BaseLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <CalendarIcon className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <h1 className="text-3xl font-bold">
            {lang === "pt" && "Leituras do Dia"}
            {lang === "en" && "Daily Readings"}
            {lang === "es" && "Lecturas del Día"}
            {lang === "it" && "Letture del Giorno"}
          </h1>
          {readingsData?.title && (
            <p className="text-lg text-primary mt-2">{readingsData.title}</p>
          )}
        </div>

        {/* Liturgical Info */}
        {readingsData?.liturgical_day && (
          <div className="reading-card mb-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor:
                    readingsData.liturgical_day.color === "white"
                      ? "#ffffff"
                      : readingsData.liturgical_day.color === "red"
                      ? "#dc2626"
                      : readingsData.liturgical_day.color === "green"
                      ? "#16a34a"
                      : readingsData.liturgical_day.color === "purple"
                      ? "#7c3aed"
                      : readingsData.liturgical_day.color === "rose"
                      ? "#e879f9"
                      : "#171717",
                  border:
                    readingsData.liturgical_day.color === "white"
                      ? "1px solid #e5e5e5"
                      : "none",
                }}
              />
              <div>
                <p className="font-medium">{readingsData.liturgical_day.name}</p>
                <p className="text-sm text-muted-foreground">
                  {readingsData.liturgical_day.season}
                  {readingsData.liturgical_day.cycle &&
                    ` - ${lang === "pt" ? "Ciclo" : lang === "es" ? "Ciclo" : lang === "it" ? "Ciclo" : "Cycle"} ${readingsData.liturgical_day.cycle}`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="reading-card bg-red-500/10 border-red-500/20">
            <p className="text-red-500">
              {lang === "pt" && "Erro ao carregar leituras: "}
              {lang === "en" && "Error loading readings: "}
              {lang === "es" && "Error al cargar lecturas: "}
              {lang === "it" && "Errore nel caricamento delle letture: "}
              {error}
            </p>
          </div>
        )}

        {/* Readings */}
        {readingsData?.readings && (
          <div className="space-y-6">
            {readingsData.readings.map((reading: any, index: number) => (
              <div key={index} className="reading-card">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">{t[reading.type] || reading.type}</h2>
                </div>
                {reading.reference && (
                  <p className="text-sm text-primary font-medium mb-3">
                    {reading.reference}
                  </p>
                )}
                {reading.responsorial && (
                  <p className="text-sm font-medium text-gold-600 dark:text-gold-400 mb-3 italic">
                    {lang === "pt" && "R. "}
                    {lang === "en" && "R. "}
                    {lang === "es" && "R. "}
                    {lang === "it" && "R. "}
                    {reading.responsorial}
                  </p>
                )}
                <div className="reading-text whitespace-pre-line">
                  {reading.text}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading State */}
        {!readingsData && !error && (
          <div className="reading-card text-center py-12">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        )}

        {/* Source */}
        {readingsData?.source && (
          <p className="text-xs text-muted-foreground text-center mt-8">
            {lang === "pt" && "Fonte: "}
            {lang === "en" && "Source: "}
            {lang === "es" && "Fuente: "}
            {lang === "it" && "Fonte: "}
            {readingsData.source}
          </p>
        )}
      </div>
    </BaseLayout>
  );
}
