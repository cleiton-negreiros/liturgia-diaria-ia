import BaseLayout from "@/components/base-layout";
import { fetchBibleBooks } from "@/lib/api";
import { BookText, BookOpen, ExternalLink } from "lucide-react";

const translations: Record<string, Record<string, string>> = {
  pt: {
    title: "Bíblia Católica",
    subtitle: "Livros da Sagrada Escritura",
    old_testament: "Antigo Testamento",
    new_testament: "Novo Testamento",
    chapters: "capítulos",
    open_bible: "Abrir Bíblia",
  },
  en: {
    title: "Catholic Bible",
    subtitle: "Books of Holy Scripture",
    old_testament: "Old Testament",
    new_testament: "New Testament",
    chapters: "chapters",
    open_bible: "Open Bible",
  },
  es: {
    title: "Biblia Católica",
    subtitle: "Libros de la Sagrada Escritura",
    old_testament: "Antiguo Testamento",
    new_testament: "Nuevo Testamento",
    chapters: "capítulos",
    open_bible: "Abrir Biblia",
  },
  it: {
    title: "Bibbia Cattolica",
    subtitle: "Libri della Sacra Scrittura",
    old_testament: "Antico Testamento",
    new_testament: "Nuovo Testamento",
    chapters: "capitoli",
    open_bible: "Apri Bibbia",
  },
};

const bibleLinks: Record<string, string> = {
  pt: "https://bibliacatolica.com.br/",
  en: "https://bible.usccb.org/",
  es: "https://www.vatican.va/archive/ESL0506/_INDEX.HTM",
  it: "https://www.vatican.va/archive/ITA0001/_INDEX.HTM",
};

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function BiblePage({ params }: Props) {
  const lang = (await params).lang || "pt";
  const t = translations[lang] || translations.pt;
  const bibleUrl = bibleLinks[lang] || bibleLinks.pt;

  let booksData = null;
  let error = null;

  try {
    const result = await fetchBibleBooks(lang);
    booksData = result.data;
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to fetch bible books";
  }

  const oldTestament = booksData?.filter((b: any) => b.testament === "old") || [];
  const newTestament = booksData?.filter((b: any) => b.testament === "new") || [];

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

        {/* Old Testament */}
        {oldTestament.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-liturgical-purple" />
              {t.old_testament}
              <span className="text-sm text-muted-foreground font-normal">
                ({oldTestament.length} {t.chapters})
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {oldTestament.map((book: any) => (
                <a
                  key={book.name}
                  href={bibleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reading-card py-3 px-4 hover:bg-accent transition-colors cursor-pointer group block"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{book.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {book.chapters} {t.chapters}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* New Testament */}
        {newTestament.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookText className="h-5 w-5 text-liturgical-green" />
              {t.new_testament}
              <span className="text-sm text-muted-foreground font-normal">
                ({newTestament.length} {t.chapters})
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {newTestament.map((book: any) => (
                <a
                  key={book.name}
                  href={bibleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reading-card py-3 px-4 hover:bg-accent transition-colors cursor-pointer group block"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{book.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {book.chapters} {t.chapters}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {!booksData && !error && (
          <div className="reading-card text-center py-12">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
