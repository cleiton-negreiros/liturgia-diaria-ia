import { Header } from "@/components/header";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="border-t border-border py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Liturgia Diária IA © {new Date().getFullYear()}</p>
          <p className="mt-1">
            Leituras da Missa Católica em Português, English, Español, Italiano
          </p>
        </div>
      </footer>
    </div>
  );
}
