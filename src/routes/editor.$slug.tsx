import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Eye, Plus, Save, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LandingView } from "@/components/LandingView";
import { emptyPage, getPage, loadPages, slugify, upsertPage, type LandingPage } from "@/lib/landing-store";

export const Route = createFileRoute("/editor/$slug")({
  head: () => ({
    meta: [
      { title: "Editor Landing Page — NodeEmber Builder" },
      {
        name: "description",
        content: "Ubah headline, fitur, paket harga, dan link tujuan landing page promosi produk kamu.",
      },
      { property: "og:title", content: "Editor Landing Page — NodeEmber Builder" },
      {
        property: "og:description",
        content: "Editor visual untuk landing page promosi dengan preview langsung.",
      },
    ],
  }),
  component: Editor,
});

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function Editor() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const isNew = slug === "baru";
  const [page, setPage] = useState<LandingPage | null>(null);
  const [originalSlug, setOriginalSlug] = useState("");

  useEffect(() => {
    if (isNew) {
      setPage({ ...emptyPage("promo-baru") });
      setOriginalSlug("");
    } else {
      const found = getPage(slug);
      setPage(found ? { ...found } : { ...emptyPage(slug) });
      setOriginalSlug(slug);
    }
  }, [slug, isNew]);

  if (!page) return <div className="min-h-screen bg-background" />;

  const set = <K extends keyof LandingPage>(key: K, value: LandingPage[K]) =>
    setPage({ ...page, [key]: value });

  const save = () => {
    const clean = slugify(page.slug || page.headline);
    if (!clean) {
      toast.error("Link tujuan tidak boleh kosong");
      return;
    }
    const conflict = loadPages().some((p) => p.slug === clean && p.slug !== originalSlug);
    if (conflict) {
      toast.error(`Link /p/${clean} sudah dipakai`);
      return;
    }
    upsertPage({ ...page, slug: clean }, originalSlug || undefined);
    toast.success(`Tersimpan di /p/${clean}`);
    navigate({ to: "/p/$slug", params: { slug: clean } });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <div className="flex items-center gap-2">
            {!isNew && (
              <Link
                to="/p/$slug"
                params={{ slug: originalSlug }}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium hover:bg-secondary"
              >
                <Eye className="h-3.5 w-3.5" /> Lihat live
              </Link>
            )}
            <button
              onClick={save}
              className="inline-flex items-center gap-2 rounded-full bg-ember-gradient px-5 py-2 text-xs font-semibold text-ember-foreground shadow-ember"
            >
              <Save className="h-3.5 w-3.5" /> Simpan
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[380px_1fr]">
        <div className="space-y-6">
          <section className="space-y-4 rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ember">Link & Brand</h2>
            <Field label="Link tujuan (slug)">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">/p/</span>
                <Input value={page.slug} onChange={(e) => set("slug", e.target.value)} placeholder="promo-ramadan" />
              </div>
            </Field>
            <Field label="Nama brand">
              <Input value={page.brand} onChange={(e) => set("brand", e.target.value)} />
            </Field>
            <Field label="Badge kecil">
              <Input value={page.badge} onChange={(e) => set("badge", e.target.value)} />
            </Field>
          </section>

          <section className="space-y-4 rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ember">Hero</h2>
            <Field label="Headline">
              <Textarea rows={2} value={page.headline} onChange={(e) => set("headline", e.target.value)} />
            </Field>
            <Field label="Sub headline">
              <Textarea rows={3} value={page.subheadline} onChange={(e) => set("subheadline", e.target.value)} />
            </Field>
            <Field label="URL gambar hero (opsional)">
              <Input value={page.heroImage} onChange={(e) => set("heroImage", e.target.value)} placeholder="https://..." />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Teks tombol utama">
                <Input value={page.ctaLabel} onChange={(e) => set("ctaLabel", e.target.value)} />
              </Field>
              <Field label="Link tombol utama">
                <Input value={page.ctaUrl} onChange={(e) => set("ctaUrl", e.target.value)} />
              </Field>
              <Field label="Teks tombol kedua">
                <Input value={page.secondaryLabel} onChange={(e) => set("secondaryLabel", e.target.value)} />
              </Field>
              <Field label="Link tombol kedua">
                <Input value={page.secondaryUrl} onChange={(e) => set("secondaryUrl", e.target.value)} />
              </Field>
            </div>
            <Field label="Nomor WhatsApp order (628...)">
              <Input value={page.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
            </Field>
          </section>

          <section className="space-y-4 rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ember">Statistik</h2>
            {page.stats.map((s, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <Input
                  value={s.value}
                  onChange={(e) => {
                    const stats = [...page.stats];
                    stats[i] = { ...s, value: e.target.value };
                    set("stats", stats);
                  }}
                />
                <Input
                  value={s.label}
                  onChange={(e) => {
                    const stats = [...page.stats];
                    stats[i] = { ...s, label: e.target.value };
                    set("stats", stats);
                  }}
                />
              </div>
            ))}
          </section>

          <section className="space-y-4 rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ember">Fitur</h2>
            {page.features.map((f, i) => (
              <div key={i} className="space-y-2 rounded-xl border border-border p-3">
                <Input
                  value={f.title}
                  onChange={(e) => {
                    const features = [...page.features];
                    features[i] = { ...f, title: e.target.value };
                    set("features", features);
                  }}
                />
                <Textarea
                  rows={2}
                  value={f.description}
                  onChange={(e) => {
                    const features = [...page.features];
                    features[i] = { ...f, description: e.target.value };
                    set("features", features);
                  }}
                />
                <button
                  onClick={() => set("features", page.features.filter((_, x) => x !== i))}
                  className="inline-flex items-center gap-1.5 text-xs text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Hapus fitur
                </button>
              </div>
            ))}
            <button
              onClick={() => set("features", [...page.features, { title: "Fitur baru", description: "Deskripsi fitur." }])}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs hover:bg-secondary"
            >
              <Plus className="h-3.5 w-3.5" /> Tambah fitur
            </button>
          </section>

          <section className="space-y-4 rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ember">Paket harga</h2>
            {page.plans.map((plan, i) => (
              <div key={i} className="space-y-2 rounded-xl border border-border p-3">
                <Input
                  value={plan.name}
                  onChange={(e) => {
                    const plans = [...page.plans];
                    plans[i] = { ...plan, name: e.target.value };
                    set("plans", plans);
                  }}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={plan.price}
                    onChange={(e) => {
                      const plans = [...page.plans];
                      plans[i] = { ...plan, price: e.target.value };
                      set("plans", plans);
                    }}
                  />
                  <Input
                    value={plan.period}
                    onChange={(e) => {
                      const plans = [...page.plans];
                      plans[i] = { ...plan, period: e.target.value };
                      set("plans", plans);
                    }}
                  />
                </div>
                <Textarea
                  rows={4}
                  value={plan.features}
                  onChange={(e) => {
                    const plans = [...page.plans];
                    plans[i] = { ...plan, features: e.target.value };
                    set("plans", plans);
                  }}
                />
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={plan.highlighted}
                      onChange={(e) => {
                        const plans = page.plans.map((p, x) => ({ ...p, highlighted: x === i ? e.target.checked : false }));
                        set("plans", plans);
                      }}
                    />
                    Tandai terlaris
                  </label>
                  <button
                    onClick={() => set("plans", page.plans.filter((_, x) => x !== i))}
                    className="inline-flex items-center gap-1.5 text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Hapus
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                set("plans", [
                  ...page.plans,
                  { name: "Paket Baru", price: "Rp0", period: "/bulan", features: "Fitur 1\nFitur 2", highlighted: false },
                ])
              }
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs hover:bg-secondary"
            >
              <Plus className="h-3.5 w-3.5" /> Tambah paket
            </button>
          </section>

          <section className="space-y-4 rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ember">Testimoni & Penutup</h2>
            <Field label="Testimoni">
              <Textarea rows={3} value={page.testimonial} onChange={(e) => set("testimonial", e.target.value)} />
            </Field>
            <Field label="Nama pemberi testimoni">
              <Input value={page.testimonialAuthor} onChange={(e) => set("testimonialAuthor", e.target.value)} />
            </Field>
            <Field label="Catatan penutup">
              <Textarea rows={2} value={page.footerNote} onChange={(e) => set("footerNote", e.target.value)} />
            </Field>
          </section>
        </div>

        <div className="rounded-3xl border border-border bg-background shadow-panel">
          <div className="border-b border-border px-5 py-2 text-xs uppercase tracking-wider text-muted-foreground">
            Preview langsung — /p/{slugify(page.slug) || "..."}
          </div>
          <div className="max-h-[80vh] overflow-y-auto rounded-b-3xl">
            <LandingView page={page} />
          </div>
        </div>
      </div>
    </div>
  );
}
