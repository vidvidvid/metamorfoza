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

export type Person = {
  name: string;
  handle?: string;
  /** Vloga v ekipi (npr. VJ, Luči). */
  role?: string;
  /** Spletna stran, če ni Instagrama. */
  url?: string;
  /** Portret 4:5 v public/deep-sea/people (800 px). */
  image?: string;
  /** Kvadratni avatar 160 px (profilna slika z Instagrama). */
  avatar?: string;
  /** Avtor fotografije, če ga je treba navesti. */
  credit?: string;
  /** "END LINE - FAVORITE FISH" iz artist postov. */
  fish?: string;
};

const P = "/deep-sea/people";

export const DESIGNERS: Person[] = [
  {
    name: "E. Sonc",
    handle: "soncno_brez.oblakov",
    image: `${P}/e-sonc.webp`,
    fish: "mečarica",
  },
  {
    name: "Hana Krnc",
    handle: "hana.krnc",
    image: `${P}/hana-krnc.webp`,
    fish: "piranha",
  },
  {
    name: "Sinja Hudnik Zaviršek",
    handle: "sinyuhh",
    image: `${P}/sinja-hudnik-zavirsek.webp`,
  },
];

export const LINEUP: Person[] = [
  {
    name: "Z☆JA",
    handle: "zojagobec",
    image: `${P}/zoja.webp`,
    fish: "morska lisica",
  },
  { name: "GPNGPNGPN", handle: "gpngpngpn", image: `${P}/gpngpngpn.webp` },
  {
    name: "মm.",
    handle: "m_read_mwo",
    image: `${P}/mm.webp`,
    credit: "Clara Wildberger",
    fish: "hilsha",
  },
  {
    name: "Waknu",
    handle: "waknu__",
    image: `${P}/waknu.webp`,
    fish: "polenouka",
  },
];

export const DECOR: Person[] = [
  {
    name: "Pixel Bambi",
    role: "VJ",
    handle: "pixel.bambi",
    avatar: `${P}/avatar-pixel.bambi.webp`,
  },
  {
    name: "Vikipiki",
    handle: "vikipiki.pokes",
    avatar: `${P}/avatar-vikipiki.pokes.webp`,
  },
  {
    name: "Nauticaa",
    role: "Scenografija",
    handle: "maist0rica",
    avatar: `${P}/avatar-maist0rica.webp`,
  },
  {
    name: "Iskra Razum",
    role: "Scenografija · Luči",
    handle: "iskrrq",
    avatar: `${P}/avatar-iskrrq.webp`,
  },
  {
    name: "Vita Tušek",
    role: "Luči",
    handle: "vitatusek",
    avatar: `${P}/avatar-vitatusek.webp`,
  },
  {
    name: "Simona",
    role: "Luči",
    handle: "kravzla",
    avatar: `${P}/avatar-kravzla.webp`,
  },
  {
    name: "Lucija Zivina",
    role: "Luči",
    handle: "z1v1na",
    avatar: `${P}/avatar-z1v1na.webp`,
  },
];

export const CREDITS: { role: string; person: Person }[] = [
  {
    role: "Foto",
    person: { name: "Petja Muck", handle: "mu_ck_", avatar: `${P}/avatar-mu_ck_.webp` },
  },
  {
    role: "Grafično oblikovanje",
    person: { name: "sitri.wtf", handle: "sitri.wtf", avatar: `${P}/avatar-sitri.wtf.webp` },
  },
  {
    role: "Video",
    person: { name: "t_soni__", handle: "t_soni__", avatar: `${P}/avatar-t_soni__.webp` },
  },
  {
    role: "Make up",
    person: { name: "Sara Šček", handle: "sara_scek", avatar: `${P}/avatar-sara_scek.webp` },
  },
  {
    role: "Creative fashion lord",
    person: { name: "Lovrency", handle: "lovrency", avatar: `${P}/avatar-lovrency.webp` },
  },
  {
    role: "Creative sugar unc",
    person: {
      name: "Mala roza muca",
      url: "http://vidvidvid.xyz/",
      avatar: `${P}/avatar-mala-roza-muca.webp`,
    },
  },
];

export function instagramUrl(handle: string) {
  return `https://www.instagram.com/${handle}/`;
}
