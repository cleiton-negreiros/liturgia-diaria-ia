import BaseLayout from "@/components/base-layout";
import { fetchCalendar } from "@/lib/api";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR, enUS, es, it } from "date-fns/locale";

const dateLocales: Record<string, any> = {
  pt: ptBR,
  en: enUS,
  es: es,
  it: it,
};

const translations: Record<string, Record<string, string>> = {
  pt: {
    title: "Calendário Litúrgico",
    subtitle: "Ano litúrgico da Igreja Católica",
    today: "Hoje",
    year: "Ano",
  },
  en: {
    title: "Liturgical Calendar",
    subtitle: "Liturgical year of the Catholic Church",
    today: "Today",
    year: "Year",
  },
  es: {
    title: "Calendario Litúrgico",
    subtitle: "Año litúrgico de la Iglesia Católica",
    today: "Hoy",
    year: "Año",
  },
  it: {
    title: "Calendario Liturgico",
    subtitle: "Anno liturgico della Chiesa Cattolica",
    today: "Oggi",
    year: "Anno",
  },
};

const seasonColors: Record<string, string> = {
  advent: "bg-liturgical-purple/10 border-liturgical-purple/20 text-liturgical-purple",
  christmas: "bg-liturgical-white/10 border-liturgical-white/20 text-foreground",
  lent: "bg-liturgical-purple/10 border-liturgical-purple/20 text-liturgical-purple",
  easter: "bg-liturgical-white/10 border-liturgical-white/20 text-foreground",
  ordinary: "bg-liturgical-green/10 border-liturgical-green/20 text-liturgical-green",
};

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function CalendarPage({ params }: Props) {
  const lang = (await params).lang || "pt";
  const t = translations[lang] || translations.pt;
  const locale = dateLocales[lang] || ptBR;

  const currentYear = new Date().getFullYear();
  let calendarData = null;
  let error = null;

  try {
    const result = await fetchCalendar(currentYear);
    calendarData = result.data;
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to fetch calendar";
  }

  const today = new Date();
  const formattedDate = format(today, "EEEE, d 'de' MMMM 'de' yyyy", { locale });

  return (
    <BaseLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-lg text-muted-foreground mt-2">{t.subtitle}</p>
          <p className="text-sm text-primary mt-2">
            {t.year} {currentYear}
          </p>
        </div>

        {/* Today Highlight */}
        <div className="reading-card mb-8 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <CalendarIcon className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">{t.today}</h2>
          </div>
          <p className="text-lg">{formattedDate}</p>
        </div>

        {/* Liturgical Seasons */}
        <div className="reading-card mb-8">
          <h2 className="font-semibold mb-4">
            {lang === "pt" && "Tempos Litúrgicos"}
            {lang === "en" && "Liturgical Seasons"}
            {lang === "es" && "Tiempos Litúrgicos"}
            {lang === "it" && "Tempi Liturgici"}
          </h2>
          <div className="space-y-3">
            {[
              {
                name: lang === "pt" ? "Advento" : lang === "es" ? "Adviento" : lang === "it" ? "Avvento" : "Advent",
                color: "liturgical-purple",
                desc: lang === "pt" ? "Preparação para o Natal" : lang === "es" ? "Preparación para la Navidad" : lang === "it" ? "Preparazione al Natale" : "Preparation for Christmas",
              },
              {
                name: lang === "pt" ? "Natal" : lang === "es" ? "Navidad" : lang === "it" ? "Natale" : "Christmas",
                color: "liturgical-white",
                desc: lang === "pt" ? "Celebração do nascimento de Jesus" : lang === "es" ? "Celebración del nacimiento de Jesús" : lang === "it" ? "Celebrazione della nascita di Gesù" : "Celebration of Jesus' birth",
              },
              {
                name: lang === "pt" ? "Quaresma" : lang === "es" ? "Cuaresma" : lang === "it" ? "Quaresima" : "Lent",
                color: "liturgical-purple",
                desc: lang === "pt" ? "Preparação para a Páscoa" : lang === "es" ? "Preparación para la Pascua" : lang === "it" ? "Preparazione alla Pasqua" : "Preparation for Easter",
              },
              {
                name: lang === "pt" ? "Páscoa" : lang === "es" ? "Pascua" : lang === "it" ? "Pasqua" : "Easter",
                color: "liturgical-white",
                desc: lang === "pt" ? "Celebração da Ressurreição" : lang === "es" ? "Celebración de la Resurrección" : lang === "it" ? "Celebrazione della Risurrezione" : "Celebration of the Resurrection",
              },
              {
                name: lang === "pt" ? "Tempo Comum" : lang === "es" ? "Tiempo Ordinario" : lang === "it" ? "Tempo Ordinario" : "Ordinary Time",
                color: "liturgical-green",
                desc: lang === "pt" ? "Crescimento na fé" : lang === "es" ? "Crecimiento en la fe" : lang === "it" ? "Crescita nella fede" : "Growth in faith",
              },
            ].map((season) => (
              <div key={season.name} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full bg-${season.color}`} />
                <div>
                  <p className="font-medium">{season.name}</p>
                  <p className="text-sm text-muted-foreground">{season.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="reading-card bg-red-500/10 border-red-500/20">
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
