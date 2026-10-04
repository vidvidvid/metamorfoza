// Skupni tip za osebe (nastopajoči, oblikovalci, ekipa) čez vse edicije.

export type Person = {
  name: string;
  handle?: string;
  /** Vloga v ekipi (npr. VJ, Luči, Scenografija). */
  role?: string;
  /** Spletna stran, če ni Instagrama. */
  url?: string;
  /** Portret 4:5 (800 px). */
  image?: string;
  /** Kvadratni avatar 160 px (profilna slika z Instagrama). */
  avatar?: string;
  /** Avtor fotografije, če ga je treba navesti. */
  credit?: string;
  /** Deep Sea: "END LINE - FAVORITE FISH" iz artist postov. */
  fish?: string;
};

export function instagramUrl(handle: string) {
  return `https://www.instagram.com/${handle}/`;
}
