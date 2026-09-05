// Podatki o dogodku Metamorfoza Vol. 3: Deep Sea.
// Vir: https://www.ch0.org/metamorfoza-vol-3-deep-sea/

export const EVENT = {
  title: "Metamorfoza Vol. 3: Deep Sea",
  // Sobota, 12. 9. 2026 ob 22:30 po ljubljanskem času (CEST, UTC+2).
  startsAt: "2026-09-12T22:30:00+02:00",
  dateLabel: "Sobota, 12. 9. 2026",
  timeLabel: "22:30",
  venue: "Channel Zero",
  city: "Ljubljana",
  url: "https://www.ch0.org/metamorfoza-vol-3-deep-sea/",
  siteUrl: "https://metamorfoza.art",
  instagram: "https://www.instagram.com/m3tam0rfoza/",
  instagramHandle: "@m3tam0rfoza",
  dressCode: "Your favorite sea creature",
  creature: {
    name: "Cnth'ula",
    rarity: "SSR",
  },
  tickets: {
    early: "10 €",
    late: "12 €",
    cutoff: "24:00",
    discount: "20 % (2 €) popusta",
    shiny: "z rare/shiny karto vstopiš zastonj",
  },
} as const;

export type Person = { name: string; handle?: string };

export const DESIGNERS: Person[] = [
  { name: "E. Sonc", handle: "soncno_brez.oblakov" },
  { name: "Hana Krnc", handle: "hana.krnc" },
  { name: "Sinja Hudnik Zaviršek", handle: "sinyuhh" },
];

export const LINEUP: Person[] = [
  { name: "Z☆JA", handle: "zojagobec" },
  { name: "GPNGPNGPN", handle: "gpngpngpn" },
  { name: "মm.", handle: "m_read_mwo" },
  { name: "DJ Waknu", handle: "waknu__" },
];

export const DECOR: Person[] = [
  { name: "Pixel Bambi" },
  { name: "Vikipiki", handle: "vikipiki.pokes" },
  { name: "Nauticaa", handle: "maist0rica" },
  { name: "Iskra Razum", handle: "iskrrrq" },
  { name: "Vita Tusek", handle: "vitatusek" },
  { name: "Simona", handle: "kravzla" },
  { name: "Lucija Zivina", handle: "z1v1na" },
];

export const CREDITS: { role: string; person: Person }[] = [
  { role: "Foto", person: { name: "Petja Muck", handle: "mu_ck_" } },
  { role: "Grafično oblikovanje", person: { name: "sitri.wtf", handle: "sitri.wtf" } },
  { role: "Video", person: { name: "t_soni__", handle: "t_soni__" } },
];

export function instagramUrl(handle: string) {
  return `https://www.instagram.com/${handle}/`;
}
