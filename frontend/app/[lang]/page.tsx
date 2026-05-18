import BaseLayout from "@/components/base-layout";
import { BookOpen, Cross, BookText, Calendar } from "lucide-react";
import Link from "next/link";

const translations: Record<string, Record<string, Record<string, string>>> = {
  pt: {
    title: "Liturgia Diária",
    subtitle: "Leituras da Missa Católica em 4 línguas",
    todayReadings: "Leituras de Hoje",
    prayers: "Orações",
    bible: "Bíblia",
    calendar: "Calendário Litúrgico",
    description: "Acompanhe a liturgia diária da Igreja Católica com leituras da missa, orações e referências bíblicas em português, inglês, espanhol e italiano.",
  },
  en: {
    title: "Daily Liturgy",
    subtitle: "Catholic Mass Readings in 4 languages",
    todayReadings: "Today's Readings",
    prayers: "Prayers",
    bible: "Bible",
    calendar: "Liturgical Calendar",
    description: "Follow the daily liturgy of the Catholic Church with mass readings, prayers and biblical references in Portuguese, English, Spanish and Italian.",
  },
  es: {
    title: "Liturgia Diaria",
    subtitle: "Lecturas de la Misa Católica en 4 idiomas",
    todayReadings: "Lecturas de Hoy",
    prayers: "Oraciones",
    bible: "Biblia",
    calendar: "Calendario Litúrgico",
    description: "Sigue la liturgia diaria de la Iglesia Católica con lecturas de la misa, oraciones y referencias bíblicas en portugués, inglés, español e italiano.",
  },
  it: {
    title: "Liturgia Quotidiana",
    subtitle: "Letture della Messa Cattolica in 4 lingue",
    todayReadings: "Letture di Oggi",
    prayers: "Preghiere",
    bible: "Bibbia",
    calendar: "Calendario Liturgico",
    description: "Segui la liturgia quotidiana della Chiesa Cattolica con letture della messa, preghiere e riferimenti biblici in portoghese, inglese, spagnolo e italiano.",
  },
};

interface Props {
  params: Promise<{ lang: string }>;
}

export default function Home({ params }: Props) {
  const lang = (params as { lang: string }).lang || "pt";
  const t = translations[lang] || translations.pt;

  const features = [
    {
      icon: BookOpen,
      title: t.todayReadings,
      href: `/${lang}/readings`,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Cross,
      title: t.prayers,
      href: `/${lang}/prayers`,
      color: "text-gold-500",
      bgColor: "bg-gold-500/10",
    },
    {
      icon: BookText,
      title: t.bible,
      href: `/${lang}/bible`,
      color: "text-liturgical-green",
      bgColor: "bg-liturgical-green/10",
    },
    {
      icon: Calendar,
      title: t.calendar,
      href: `/${lang}/calendar`,
      color: "text-liturgical-purple",
      bgColor: "bg-liturgical-purple/10",
    },
  ];

  return (
    <BaseLayout>
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.title}</h1>
          <p className="text-xl text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group reading-card hover:scale-[1.02] transition-transform"
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {lang === "pt" && "Clique para acessar"}
                {lang === "en" && "Click to access"}
                {lang === "es" && "Haz clic para acceder"}
                {lang === "it" && "Clicca per accedere"}
              </p>
            </Link>
          ))}
        </div>

        {/* Description */}
        <div className="text-center text-muted-foreground">
          <p>{t.description}</p>
        </div>
      </div>
    </BaseLayout>
  );
}
