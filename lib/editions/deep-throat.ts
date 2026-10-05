// Podatki o dogodku Metamorfoza Vol. 4: Deep Throat (Noč čarovnic).
// Vir: opis dogodka za IG/FB, 4. 10. 2026 - dolg opis še ni bil končan,
// pred objavo preveri. Nastopajoči brez poslanega opisa imajo
// `bioIsPlaceholder: true` (izmišljen opis, zamenjaj).
import type { Person } from "@/lib/people";

export const EVENT = {
  vol: 4,
  title: "Metamorfoza Vol. 4: Deep Throat",
  name: "Deep Throat",
  kanji: "喉神",
  partner: "Channel Zero",
  // Sobota, 31. 10. 2026 ob 22:30 po ljubljanskem času (CET, UTC+1 - zimski čas velja od 25. 10.).
  startsAt: "2026-10-31T22:30:00+01:00",
  dateLabel: "Sobota, 31. 10. 2026",
  timeLabel: "22:30",
  venue: "Channel Zero",
  city: "Ljubljana",
  // TODO: ch0.org še nima strani dogodka (preverjeno 4. 10. 2026) - zamenjaj, ko bo objavljena.
  url: "https://www.ch0.org/",
  siteUrl: "https://metamorfoza.art",
  instagram: "https://www.instagram.com/m3tam0rfoza/",
  instagramHandle: "@m3tam0rfoza",
  dressCode: "Maske",
  dressCodeNote:
    "Čim bolj strupeno - karkoli zažari pod blacklightom: fluorescenca, sluz, vomit green.",
  creature: {
    name: "Nodoshin",
    kanji: "喉神",
    tagline: "Božanstvo, ki ne govori, temveč golta.",
  },
  tickets: {
    early: "10 €",
    late: "12 €",
    cutoff: "00:00",
    discount: "2 € popusta",
    previousEdition: "Deep Sea",
  },
  hashtags: [
    "halloween",
    "noččarovnic",
    "maske",
    "deepthroat",
    "nodoshin",
    "喉神",
    "blacklight",
    "fluorescenca",
    "ritual",
    "metamorfoza",
  ],
} as const;

export type Act = Person & {
  /** Vloga (DJ, Resident DJ, Performans). */
  role: string;
  bio: string;
  /** Nastopajoči ni poslal opisa - ta je izmišljen, zamenjaj ga. */
  bioIsPlaceholder?: boolean;
  emoji?: string;
};

const P = "/deep-throat/people";

// Portreti (kvadrat 480 px) v public/deep-throat/people: iz Drive mape
// nastopajočih, Waknu iz Vol. 3, shizika in Nace1518 s profilne slike na IG.
export const ACTS = {
  shizika: {
    name: "shizika",
    image: `${P}/shizika.webp`,
    handle: "shizika._",
    role: "DJ",
    bio: "SHIZIKA združuje svetovne ritme v zvok, ki udari z vso močjo, a hkrati deluje toplo in osvobajajoče. Njeni seti temeljijo na perkusijah, igrivih vokalih in heavy bass selekcijah, ki razgrejejo prostor in vas ne pustijo stati na mestu. Navdih črpa iz svojega makedonskega porekla in časa, ki ga je preživela na Portugalskem, zdaj pa na ljubljanskih plesiščih ustvarja glasbo, ki združuje latino, balkan, afro, arabske in britanske klubske zvoke.",
  },
  dvidevat: {
    name: "dvidevat",
    image: `${P}/dvidevat.webp`,
    handle: "dvidevat",
    role: "DJ",
    bio: "dvidevat ne izbira med natančnostjo in kaosom - dirigira obema. Slovenska producentka in DJ-ka, ki zdaj živi v Amsterdamu, se giblje po raznoliki zvočni pokrajini electra, surovih breakov in visokooktanskega techna. Njen zvok uspeva v vmesnem prostoru - instinktiven, a premišljen - gnan z zagonom, tam, kjer se srečata struktura in nepredvidljivost. Medtem ko še naprej premika meje in raziskuje nova zvočna ozemlja, dvidevat hitro postaja eden najbolj prepričljivih glasov elektronske glasbe.",
  },
  waknu: {
    name: "Waknu",
    image: `${P}/waknu.webp`,
    handle: "waknu__",
    role: "Resident DJ",
    emoji: "🪿",
    bio: "Juhuhu spet smo tu, buče se šnitajo ku šalame, barve se spet barvajo, listeki odpadajo in ptički so se počasi začel šušmarit onkraj na twplčke! No, kokr pticke grejo n twplu tku bo tud waknu poskrbeu da bo temperatura lih prou za use k priletijo, se sprehodijo alpa zaplavajo na ta veseli dan v ch0!",
  },
  terranigma: {
    name: "Terranigma",
    image: `${P}/terranigma.webp`,
    credit: "Bernarda Čonič",
    handle: "terranigma_crt",
    role: "DJ",
    bio: "Črt Trkman alias Terranigma je producent, sound designer in DJ, ki na domači elektronski sceni vztraja že več kot desetletje. Začel je kot promotor v legendarnem K4 in tam postal rezident, nato pa osvojil podzemne klube in festivale po Sloveniji. Od dub techna in UK bassa je prišel do hibrida med elektrom, acidom in technom, ki ga igra tudi v živo. Izdaje pri Kamizdatu in DE/FRAGMENT, zvočno oblikovanje za Svetlobno gverilo.",
  },
  sunneh: {
    name: "Sunneh",
    image: `${P}/sunneh.webp`,
    handle: "sani.sunneh",
    role: "DJ",
    bio: "Prekaljeni Ljubljančan, ki ga najpogosteje povezujemo z metelkovsko temnico Channel Zero. Debitiral je leta 2005 na Trnfestu z old school jungle in drum & bass setom, kasneje tam vodil program, v naslednjih petnajstih letih pa nastopal po klubih in festivalih kot član kultnih ekip Soulless, Krunch it!!, Footwerk, Filter in Dub Lab. Danes je idejni vodja 170-bpm zaprisežencev Frag::ments.",
  },
  nace: {
    name: "Nace1518",
    image: `${P}/nace1518.webp`,
    handle: "nace1518novak",
    role: "Performans",
    bio: "Opolnoči se izvije iz sluznice.",
  },
} satisfies Record<string, Act>;

export type Prize = {
  place: string;
  title: string;
  text: string;
  people: { name: string; handle: string }[];
};

/** Postavka na časovnici: DJ set (1 ali 2 nastopajoča za b2b), performans ali tekmovanje. */
export type Slot =
  | { kind: "set"; start: string; end: string; acts: Act[] }
  | { kind: "performance"; start: string; act: Act; text: string }
  | {
      kind: "contest";
      start: string;
      end: string;
      title: string;
      tagline: string;
      text: string;
      prizes: Prize[];
    };

// Potek noči od 22:30 do 06:00, od zgoraj navzdol.
export const TIMELINE: Slot[] = [
  { kind: "set", start: "22:30", end: "00:00", acts: [ACTS.shizika] },
  {
    kind: "performance",
    start: "00:00",
    act: ACTS.nace,
    text: "Opolnoči se izvije iz sluznice.",
  },
  {
    kind: "contest",
    start: "00:15",
    end: "00:35",
    title: "Tekmovanje mask",
    tagline: "best ★ costume contest!!!",
    text: "Vodijo ga Vera & brezmilostni žirantje.",
    prizes: [
      {
        place: "1. mesto",
        title: "Tattoo do 100 €",
        text: "Motiv po meri zmagovalca: dizajn sitri.wtf, tetovira Farah. Če zmagovalec noče pod iglo, dobi majico ali pulover s potiskom po želji.",
        people: [
          { name: "sitri.wtf", handle: "sitri.wtf" },
          { name: "Farah", handle: "tatt_soni" },
        ],
      },
      {
        place: "2. in 3. mesto",
        title: "Merch & drobnarije",
        text: "Majice, chokerji in druge drobnarije z motivom edicije.",
        people: [{ name: "sitri.wtf", handle: "sitri.wtf" }],
      },
    ],
  },
  { kind: "set", start: "00:35", end: "03:00", acts: [ACTS.waknu, ACTS.dvidevat] },
  { kind: "set", start: "03:00", end: "06:00", acts: [ACTS.terranigma, ACTS.sunneh] },
];

export const CHILL_ZONE = {
  when: "Vso noč",
  title: "Dark Chill Zone",
  text: "Fluorescentna cona pod blacklightom v drobovju kluba. Prebavi se, preden te plesišče spet pogoltne.",
  emoji: "🧪",
} as const;

export const CREW: Person[] = [
  {
    name: "Pixel Bambi",
    role: "VJ",
    handle: "pixel.bambi",
    avatar: `${P}/avatar-pixel.bambi.webp`,
  },
  {
    name: "Lovrency",
    role: "Scenografija",
    handle: "lovrency",
    avatar: `${P}/avatar-lovrency.webp`,
  },
  {
    name: "J. G.",
    role: "Scenografija",
    handle: "jaka_grm",
    avatar: `${P}/avatar-jaka_grm.webp`,
  },
  {
    name: "Vikipiki",
    role: "Scenografija",
    handle: "vikipiki.pokes",
    avatar: `${P}/avatar-vikipiki.pokes.webp`,
  },
  {
    name: "Nauticaa",
    role: "Scenografija",
    handle: "nauti_caa",
    avatar: `${P}/avatar-nauti_caa.webp`,
  },
  {
    name: "Petja Muck",
    role: "Foto",
    handle: "mu_ck_",
    avatar: `${P}/avatar-mu_ck_.webp`,
  },
  {
    name: "sitri.wtf",
    role: "Card art & design",
    handle: "sitri.wtf",
    avatar: `${P}/avatar-sitri.wtf.webp`,
  },
  {
    name: "Mala roza muca",
    role: "Goo goon",
    url: "http://vidvidvid.xyz/",
    avatar: `${P}/avatar-mala-roza-muca.webp`,
  },
];
