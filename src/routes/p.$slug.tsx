import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getPage, type LandingPage } from "@/lib/landing-store";
import { LandingView } from "@/components/LandingView";

export const Route = createFileRoute("/p/$slug")({
  head: () => ({
    meta: [
      { title: "Promo Panel Bot Pterodactyl — Hosting Bot Anti Ribet" },
      {
        name: "description",
        content:
          "Landing page promosi Panel Bot Pterodactyl: uptime 99.9%, aktivasi instan, dan harga mulai Rp5.000 per bulan.",
      },
      { property: "og:title", content: "Promo Panel Bot Pterodactyl — Hosting Bot Anti Ribet" },
      {
        property: "og:description",
        content: "Deploy bot WhatsApp, Discord, dan Telegram dengan panel Pterodactyl full akses.",
      },
    ],
  }),
  component: PublicPage,
});

function PublicPage() {
  const { slug } = Route.useParams();
  const [page, setPage] = useState<LandingPage | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPage(getPage(slug) ?? null);
    setReady(true);
  }, [slug]);

  if (!ready) return <div className="min-h-screen bg-background" />;

  if (!page) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5 text-center">
        <div>
          <h1 className="text-2xl font-bold">Landing page tidak ditemukan</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Halaman <code className="text-ember">/p/{slug}</code> belum dibuat di perangkat ini.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-full bg-ember-gradient px-6 py-3 text-sm font-semibold text-ember-foreground"
          >
            Kembali ke dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <LandingView page={page} />;
}
