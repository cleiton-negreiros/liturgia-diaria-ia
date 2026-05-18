import BaseLayout from "@/components/base-layout";
import { fetchPrayers } from "@/lib/api";
import { Cross, ChevronDown } from "lucide-react";

const translations: Record<string, Record<string, string>> = {
  pt: {
    title: "Orações Católicas",
    subtitle: "Orações tradicionais em 4 línguas",
    all: "Todas",
    traditional: "Tradicionais",
    devotion: "Devoção",
    novena: "Novena",
  },
  en: {
    title: "Catholic Prayers",
    subtitle: "Traditional prayers in 4 languages",
    all: "All",
    traditional: "Traditional",
    devotion: "Devotion",
    novena: "Novena",
  },
  es: {
    title: "Oraciones Católicas",
    subtitle: "Oraciones tradicionales en 4 idiomas",
    all: "Todas",
    traditional: "Tradicionales",
    devotion: "Devoción",
    novena: "Novena",
  },
  it: {
    title: "Preghiere Cattoliche",
    subtitle: "Preghiere tradizionali in 4 lingue",
    all: "Tutte",
    traditional: "Tradizionali",
    devotion: "Devozione",
    novena: "Novena",
  },
};

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function PrayersPage({ params }: Props) {
  const lang = (await params).lang || "pt";
  const t = translations[lang] || translations.pt;

  let prayersData = null;
  let error = null;

  try {
    const result = await fetchPrayers(lang);
    prayersData = result.data;
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to fetch prayers";
  }

  return (
    <BaseLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-lg text-muted-foreground mt-2">{t.subtitle}</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="reading-card bg-red-500/10 border-red-500/20">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Prayers List */}
        {prayersData && (
          <div className="space-y-4">
            {prayersData.map((prayer: any) => (
              <details
                key={prayer.id}
                className="reading-card group [&[open]>summary_.chevron]:rotate-180"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cross className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">{prayer.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t[prayer.category] || prayer.category}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-muted-foreground chevron transition-transform" />
                </summary>
                <div className="mt-4 pt-4 border-t border-border">
                  <pre className="whitespace-pre-line text-muted-foreground leading-relaxed font-sans">
                    {prayer.content}
                  </pre>
                </div>
              </details>
            ))}
          </div>
        )}

        {/* Loading State */}
        {!prayersData && !error && (
          <div className="reading-card text-center py-12">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
