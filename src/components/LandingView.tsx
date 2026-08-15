import type { LandingPage } from "@/lib/landing-store";
import heroImage from "@/assets/hero-panel.jpg";
import { Check, ShieldCheck, Zap, Shield, CreditCard, Server, Gauge } from "lucide-react";

const icons = [ShieldCheck, Zap, Shield, CreditCard, Server, Gauge];

export function LandingView({ page }: { page: LandingPage }) {
  const hero = page.heroImage?.trim() ? page.heroImage : heroImage;

  // Get theme colors with fallbacks
  const theme = page.theme || {
    primaryColor: "#ff6b35",
    accentColor: "#ff6b35",
    backgroundColor: "#0a0e27",
    textColor: "#f5f5f5",
    mutedColor: "#7a8b99",
  };

  // Create CSS variables for theme
  const themeStyle = {
    "--primary": theme.primaryColor,
    "--accent": theme.accentColor,
    "--bg": theme.backgroundColor,
    "--text": theme.textColor,
    "--muted": theme.mutedColor,
  } as React.CSSProperties;

  return (
    <div className="min-h-screen bg-background text-foreground" style={themeStyle}>
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="font-display text-lg font-bold tracking-tight">LINK DOWNLOAD DI BAWAH</span>
          <a
            href={page.ctaUrl || "#harga"}
            className="rounded-full px-5 py-2 text-sm font-semibold text-ember-foreground transition-transform hover:scale-[1.03]"
            style={{
              backgroundColor: theme.primaryColor,
              color: theme.textColor,
            }}
          >
            {page.ctaLabel}
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
          style={{
            backgroundColor: theme.primaryColor,
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-2">
          <div>
            {page.badge && (
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]"
                style={{
                  borderColor: theme.primaryColor,
                  color: theme.primaryColor,
                  backgroundColor: `${theme.primaryColor}15`,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: theme.primaryColor }}
                />
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
                className="rounded-full px-7 py-3 text-sm font-semibold shadow-lg transition-transform hover:scale-[1.03]"
                style={{
                  backgroundColor: theme.primaryColor,
                  color: theme.textColor,
                }}
              >
                {page.ctaLabel}
              </a>
              {page.secondaryLabel && (
                <a
                  href={page.secondaryUrl || "#harga"}
                  className="rounded-full border px-7 py-3 text-sm font-semibold transition-colors hover:opacity-80"
                  style={{
                    borderColor: theme.primaryColor,
                    color: theme.textColor,
                  }}
                >
                  {page.secondaryLabel}
                </a>
              )}
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {page.stats.map((s) => (
                <div key={s.label}>
                  <dt
                    className="font-display text-2xl font-bold"
                    style={{ color: theme.primaryColor }}
                  >
                    {s.value}
                  </dt>
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
        <h2 className="text-3xl font-bold md:text-4xl">Mengapa memilih kami?</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.features.map((f, i) => {
  const Icon = icons[i % icons.length];
  return (
    <div
      key={f.title + i}
      className="rounded-2xl border border-border bg-surface-gradient p-6 transition-colors hover:border-opacity-60"
      style={{
        borderColor: theme.primaryColor,
      }}
    >
      {/* Icon & Title sebaris */}
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${theme.primaryColor}15`,
            color: theme.primaryColor,
          }}
        >
          <Icon className="h-5 w-5" />
        </span>

        <h3 className="text-lg font-semibold">{f.title}</h3>
      </div>

      {/* Deskripsi berada di bawah icon & title */}
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {f.description}
      </p>
    </div>
  );
})}
        </div>
      </section>

      <section id="harga" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl font-bold md:text-4xl">DAFTAR HARGA</h2>
        <p className="mt-3 text-muted-foreground">Harga panel yang telah kami sediakan sangat terjangkau dengan kualitas server yang stabil.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {page.plans.map((plan, i) => (
            <div
              key={plan.name + i}
              className={
                plan.highlighted
                  ? "relative rounded-3xl border p-7 shadow-lg"
                  : "rounded-3xl border border-border bg-surface p-7"
              }
              style={
                plan.highlighted
                  ? {
                      borderColor: theme.primaryColor,
                      backgroundColor: `${theme.primaryColor}10`,
                    }
                  : {}
              }
            >
              {plan.highlighted && (
                <span
                  className="absolute -top-3 left-7 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: theme.primaryColor,
                    color: theme.textColor,
                  }}
                >
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
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: theme.primaryColor }}
                      />
                      <span>{line}</span>
                    </li>
                  ))}
              </ul>
              <a
                href={page.ctaUrl}
                className={
                  plan.highlighted
                    ? "mt-7 block rounded-full py-3 text-center text-sm font-semibold"
                    : "mt-7 block rounded-full border py-3 text-center text-sm font-semibold transition-colors hover:bg-secondary"
                }
                style={
                  plan.highlighted
                    ? {
                        backgroundColor: theme.primaryColor,
                        color: theme.textColor,
                      }
                    : {
                        borderColor: theme.primaryColor,
                        color: theme.textColor,
                      }
                }
              >
                Order Sekarang
              </a>
            </div>
          ))}
        </div>
      </section>

      {page.testimonial && (
        <section className="mx-auto max-w-4xl px-5 py-16">
          <blockquote
            className="rounded-3xl border p-8 text-center"
            style={{
              borderColor: theme.primaryColor,
              backgroundColor: `${theme.primaryColor}10`,
            }}
          >
            <p className="font-display text-xl leading-relaxed md:text-2xl">"{page.testimonial}"</p>
            <footer className="mt-5 text-sm text-muted-foreground">{page.testimonialAuthor}</footer>
          </blockquote>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div
          className="rounded-3xl p-10 text-center"
          style={{
            borderColor: theme.primaryColor,
            backgroundColor: `${theme.primaryColor}10`,
            border: `1px solid ${theme.primaryColor}40`,
          }}
        >
          <h2 className="text-3xl font-bold md:text-4xl">{page.brand}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{page.footerNote}</p>
          <a
            href={page.whatsapp}
            className="mt-7 inline-block rounded-full px-8 py-3 text-sm font-semibold shadow-lg transition-transform hover:scale-[1.03]"
            style={{
              backgroundColor: theme.primaryColor,
              color: theme.textColor,
            }}
          >
            ⎙ 𝗖𝗟𝗜𝗖𝗞 𝗗𝗜 𝗦𝗜𝗡𝗜 ⎙
          </a>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TokoPanel Official. Semua hak dilindungi.
      </footer>
    </div>
  );
}
