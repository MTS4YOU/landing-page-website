import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Plus,
  ExternalLink,
  Pencil,
  Trash2,
  Copy,
  LayoutTemplate,
  Settings,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import {
  loadPages,
  deletePage,
  emptyPage,
  upsertPage,
  slugify,
  type LandingPage,
} from "@/lib/landing-store";
import { isSessionActive, initializeAuth, logout } from "@/lib/auth-store";
import { AuthDialog } from "@/components/AuthDialog";
import { AdminSettingsDialog } from "@/components/AdminSettingsDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Multi Lander Magic — Buat Banyak Landing Page" },
      {
        name: "description",
        content:
          "Buat dan kelola banyak landing page profesional untuk berbagai campaign Anda dengan mudah, langsung dari browser.",
      },
      { property: "og:title", content: "Multi Lander Magic — Buat Banyak Landing Page" },
      {
        property: "og:description",
        content:
          "Kelola banyak landing page dengan link tujuan berbeda dan tema yang dapat disesuaikan dalam satu dashboard.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [ready, setReady] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initializeAuth();
    const authenticated = isSessionActive();
    setIsAuthenticated(authenticated);

    if (!authenticated) {
      setShowAuthDialog(true);
    } else {
      setPages(loadPages());
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setPages(loadPages());
      setReady(true);
    }
  }, [isAuthenticated]);

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
      <AuthDialog
        open={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onSuccess={() => setIsAuthenticated(true)}
      />
      <AdminSettingsDialog open={showSettingsDialog} onClose={() => setShowSettingsDialog(false)} />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-ember-gradient opacity-[0.12] blur-[120px]" />
      <div className="relative mx-auto max-w-5xl px-5 py-14">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <LayoutTemplate className="h-3.5 w-3.5 text-ember" /> Landing Page Builder
            </span>
            <h1 className="mt-5 text-4xl font-bold md:text-5xl">
              Buat banyak <span className="text-ember-gradient">landing page promosi</span>
            </h1>
          </div>
          {isAuthenticated && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowSettingsDialog(true)}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:bg-secondary"
                title="Pengaturan Admin"
              >
                <Settings className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsAuthenticated(false);
                  setShowAuthDialog(true);
                  toast.info("Logged out");
                }}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:bg-secondary text-destructive hover:border-destructive/50"
                title="Logout"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Setiap landing page punya link tujuan sendiri (contoh:{" "}
          <code className="text-ember">/p/promo-ramadan</code>). Ubah headline, fitur, harga, dan
          tombol order sesuai kampanye.
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
