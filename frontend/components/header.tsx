"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, BookOpen, Cross, Calendar, Menu, X, BookText } from "lucide-react";
import { useState } from "react";
import { useLanguage, type Language, languageNames } from "./language-provider";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "readings", icon: BookOpen, href: "/readings" },
  { name: "prayers", icon: Cross, href: "/prayers" },
  { name: "bible", icon: BookText, href: "/bible" },
  { name: "calendar", icon: Calendar, href: "/calendar" },
];

const translations: Record<string, Record<Language, string>> = {
  readings: { pt: "Leituras", en: "Readings", es: "Lecturas", it: "Letture" },
  prayers: { pt: "Orações", en: "Prayers", es: "Oraciones", it: "Preghiere" },
  bible: { pt: "Bíblia", en: "Bible", es: "Bibbia", it: "Bibbia" },
  calendar: { pt: "Calendário", en: "Calendar", es: "Calendario", it: "Calendario" },
};

export function Header() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLang = pathname?.split("/")[1] as Language | undefined;
  const lang = currentLang || language;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <Cross className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg hidden sm:inline">Liturgia Diária</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => {
            const isActive = pathname?.includes(item.href);
            return (
              <Link
                key={item.name}
                href={`/${lang}${item.href}`}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {translations[item.name]?.[lang] || item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="h-9 rounded-md border border-border bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Object.entries(languageNames).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 rounded-md border border-border bg-background flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden h-9 w-9 rounded-md border border-border bg-background flex items-center justify-center"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navigation.map((item) => {
              const isActive = pathname?.includes(item.href);
              return (
                <Link
                  key={item.name}
                  href={`/${lang}${item.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {translations[item.name]?.[lang] || item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
