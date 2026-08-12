import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, ExternalLink, Pencil, Trash2, Copy, LayoutTemplate } from "lucide-react";
import { toast } from "sonner";
import { loadPages, deletePage, emptyPage, upsertPage, slugify, type LandingPage } from "@/lib/landing-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NodeEmber Builder — Buat Banyak Landing Page Promosi" },
      {
        name: "description",
        content:
          "Bikin dan kelola banyak landing page promosi Panel Bot Pterodactyl dengan link tujuan sendiri, langsung dari browser.",
      },
      { property: "og:title", content: "NodeEmber Builder — Buat Banyak Landing Page Promosi" },
      {
        property: "og:description",
        content: "Kelola banyak landing page promosi produk dengan link tujuan berbeda dalam satu dashboard.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPages(loadPages());
    setReady(true);
  }, []);

  const remove = (slug: string) => {
    deletePage(slug);
    setPages(loadPages());
    toast.success("Landing page dihapus");
  };

  const duplicate = (page: LandingPage) => {
    let slug = `${page.slug}-copy`;
    let n = 2;
    const taken = new Set(loadPages().map((p) => p.slug));
    while (taken.has(slug)) slug = `${page.slug}-copy-${n++}`;
    upsertPage({ ...page, slug, createdAt: Date.now() });
    setPages(loadPages());
    toast.success(`Disalin ke /p/${slug}`);
  };

  const createStarter = () => {
    const taken = new Set(loadPages().map((p) => p.slug));
    let slug = slugify("promo-panel-bot");
    let n = 2;
    while (taken.has(slug)) slug = `promo-panel-bot-${n++}`;
    upsertPage({ ...emptyPage(slug) });
    setPages(loadPages());
    toast.success("Template contoh dibuat");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-ember-gradient opacity-[0.12] blur-[120px]" />
      <div className="relative mx-auto max-w-5xl px-5 py-14">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <LayoutTemplate className="h-3.5 w-3.5 text-ember" /> Landing Page Builder
        </span>
        <h1 className="mt-5 text-4xl font-bold md:text-5xl">
          Buat banyak <span className="text-ember-gradient">landing page promosi</span>
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Setiap landing page punya link tujuan sendiri (contoh: <code className="text-ember">/p/promo-ramadan</code>).
          Ubah headline, fitur, harga, dan tombol order sesuai kampanye.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/editor/$slug"
            params={{ slug: "baru" }}
            className="inline-flex items-center gap-2 rounded-full bg-ember-gradient px-6 py-3 text-sm font-semibold text-ember-foreground shadow-ember transition-transform hover:scale-[1.03]"
          >
            <Plus className="h-4 w-4" /> Landing page baru
          </Link>
          <button
            onClick={createStarter}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Pakai template contoh
          </button>
        </div>

        <div className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Landing page kamu ({pages.length})
          </h2>
          {!ready ? null : pages.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              Belum ada landing page. Mulai dari template contoh di atas.
            </p>
          ) : (
            <ul className="mt-5 grid gap-4">
              {pages.map((p) => (
                <li
                  key={p.slug}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface-gradient p-5"
                >
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-semibold">{p.headline}</p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      /p/{p.slug} · {p.brand}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to="/p/$slug"
                      params={{ slug: p.slug }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:bg-secondary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Buka
                    </Link>
                    <Link
                      to="/editor/$slug"
                      params={{ slug: p.slug }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:bg-secondary"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Link>
                    <button
                      onClick={() => duplicate(p)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:bg-secondary"
                    >
                      <Copy className="h-3.5 w-3.5" /> Duplikat
                    </button>
                    <button
                      onClick={() => remove(p.slug)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-destructive/50 px-4 py-2 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
