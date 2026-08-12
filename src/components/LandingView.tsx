import type { LandingPage } from "@/lib/landing-store";
import heroImage from "@/assets/hero-panel.jpg";
import { Check, Zap, ShieldCheck, Rocket, Server } from "lucide-react";

const icons = [Server, Zap, ShieldCheck, Rocket];

export function LandingView({ page }: { page: LandingPage }) {
  const hero = page.heroImage?.trim() ? page.heroImage : heroImage;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="font-display text-lg font-bold tracking-tight">{page.brand}</span>
          <a
            href={page.ctaUrl || "#harga"}
            className="rounded-full bg-ember-gradient px-5 py-2 text-sm font-semibold text-ember-foreground transition-transform hover:scale-[1.03]"
          >
            {page.ctaLabel}
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-ember-gradient opacity-20 blur-[120px]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-2">
          <div>
            {page.badge && (
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                {page.badge}
              </span>
            )}
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] md:text-6xl">{page.headline}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {page.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={page.ctaUrl || "#harga"}
                className="rounded-full bg-ember-gradient px-7 py-3 text-sm font-semibold text-ember-foreground shadow-ember transition-transform hover:scale-[1.03]"
              >
                {page.ctaLabel}
              </a>
              {page.secondaryLabel && (
                <a
                  href={page.secondaryUrl || "#harga"}
                  className="rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  {page.secondaryLabel}
                </a>
              )}
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {page.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl font-bold text-ember">{s.value}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-panel">
              <img src={hero} alt={page.headline} width={1280} height={960} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl font-bold md:text-4xl">Kenapa pilih {page.brand}?</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.features.map((f, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={f.title + i}
                className="rounded-2xl border border-border bg-surface-gradient p-6 transition-colors hover:border-ember/60"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ember/15 text-ember">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="harga" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl font-bold md:text-4xl">Pilih paketmu</h2>
        <p className="mt-3 text-muted-foreground">Semua paket aktif instan setelah pembayaran.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {page.plans.map((plan, i) => (
            <div
              key={plan.name + i}
              className={
                plan.highlighted
                  ? "relative rounded-3xl border border-ember bg-surface-gradient p-7 shadow-ember"
                  : "rounded-3xl border border-border bg-surface p-7"
              }
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-7 rounded-full bg-ember-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ember-foreground">
                  Terlaris
                </span>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-3">
                <span className="font-display text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {plan.features
                  .split("\n")
                  .filter(Boolean)
                  .map((line) => (
                    <li key={line} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                      <span>{line}</span>
                    </li>
                  ))}
              </ul>
              <a
                href={page.whatsapp ? `https://wa.me/${page.whatsapp}?text=Halo,%20saya%20mau%20order%20paket%20${encodeURIComponent(plan.name)}` : page.ctaUrl}
                className={
                  plan.highlighted
                    ? "mt-7 block rounded-full bg-ember-gradient py-3 text-center text-sm font-semibold text-ember-foreground"
                    : "mt-7 block rounded-full border border-border py-3 text-center text-sm font-semibold transition-colors hover:bg-secondary"
                }
              >
                Order {plan.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      {page.testimonial && (
        <section className="mx-auto max-w-4xl px-5 py-16">
          <blockquote className="rounded-3xl border border-border bg-surface-gradient p-8 text-center">
            <p className="font-display text-xl leading-relaxed md:text-2xl">"{page.testimonial}"</p>
            <footer className="mt-5 text-sm text-muted-foreground">{page.testimonialAuthor}</footer>
          </blockquote>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-3xl border border-ember/40 bg-surface-gradient p-10 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Siap jalankan botmu hari ini?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{page.footerNote}</p>
          <a
            href={page.ctaUrl || "#harga"}
            className="mt-7 inline-block rounded-full bg-ember-gradient px-8 py-3 text-sm font-semibold text-ember-foreground shadow-ember transition-transform hover:scale-[1.03]"
          >
            {page.ctaLabel}
          </a>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {page.brand}. Semua hak dilindungi.
      </footer>
    </div>
  );
}
