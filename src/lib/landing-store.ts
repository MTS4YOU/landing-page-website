export type Feature = { title: string; description: string };
export type Plan = { name: string; price: string; period: string; features: string; highlighted: boolean };

export type LandingPage = {
  slug: string;
  createdAt: number;
  brand: string;
  badge: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaUrl: string;
  secondaryLabel: string;
  secondaryUrl: string;
  heroImage: string;
  stats: { value: string; label: string }[];
  features: Feature[];
  plans: Plan[];
  testimonial: string;
  testimonialAuthor: string;
  footerNote: string;
  whatsapp: string;
};

const KEY = "emberpage.pages.v1";

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 48);
}

export function emptyPage(slug = ""): LandingPage {
  return {
    slug,
    createdAt: Date.now(),
    brand: "NodeEmber",
    badge: "Panel Bot Pterodactyl",
    headline: "Hosting Panel Bot Pterodactyl Anti Ribet",
    subheadline:
      "Deploy bot WhatsApp, Discord, dan Telegram dalam hitungan detik. Panel Pterodactyl full akses, uptime 99.9%, dan support 24 jam.",
    ctaLabel: "Order Sekarang",
    ctaUrl: "https://wa.me/6281234567890",
    secondaryLabel: "Lihat Demo Panel",
    secondaryUrl: "#harga",
    heroImage: "",
    stats: [
      { value: "99.9%", label: "Uptime server" },
      { value: "< 30 dtk", label: "Proses aktivasi" },
      { value: "24/7", label: "Support admin" },
    ],
    features: [
      { title: "Full Akses Panel", description: "Kelola file, console, dan restart bot langsung dari Pterodactyl." },
      { title: "NVMe & CPU Kencang", description: "Server NVMe dengan CPU high clock, bot jalan tanpa nge-lag." },
      { title: "Auto Restart", description: "Bot mati otomatis dinyalakan lagi, tidak perlu jaga 24 jam." },
      { title: "Aktivasi Instan", description: "Setelah bayar, akun panel langsung dikirim otomatis." },
    ],
    plans: [
      { name: "Starter", price: "Rp5.000", period: "/bulan", features: "1GB RAM\n50% CPU\n5GB SSD\n1 Bot", highlighted: false },
      { name: "Pro", price: "Rp15.000", period: "/bulan", features: "4GB RAM\n150% CPU\n20GB SSD\nUnlimited Bot", highlighted: true },
      { name: "Unlimited", price: "Rp35.000", period: "/bulan", features: "Unlimited RAM\n400% CPU\n60GB SSD\nPriority Support", highlighted: false },
    ],
    testimonial:
      "Sudah 8 bulan pakai panelnya buat 12 bot WhatsApp, belum pernah down. Adminnya fast response banget.",
    testimonialAuthor: "Rizky — Owner Bot Store",
    footerNote: "Pembayaran via QRIS, Dana, Gopay, dan transfer bank.",
    whatsapp: "6281234567890",
  };
}

export function loadPages(): LandingPage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LandingPage[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePages(pages: LandingPage[]) {
  window.localStorage.setItem(KEY, JSON.stringify(pages));
}

export function getPage(slug: string): LandingPage | undefined {
  return loadPages().find((p) => p.slug === slug);
}

export function upsertPage(page: LandingPage, originalSlug?: string) {
  const pages = loadPages().filter((p) => p.slug !== page.slug && p.slug !== originalSlug);
  savePages([page, ...pages]);
}

export function deletePage(slug: string) {
  savePages(loadPages().filter((p) => p.slug !== slug));
}
