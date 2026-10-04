// Seznam vseh edicij za preklop med njimi (noga, arhivska pasica).
// Vol. 1 in 2 nista imeli svoje strani - vodita na ch0.org.

export type Edition = {
  vol: number;
  name: string;
  date: string;
  href: string;
  external?: boolean;
};

export const EDITIONS: Edition[] = [
  {
    vol: 1,
    name: "Genesis",
    date: "13. 9. 2025",
    href: "https://www.ch0.org/metamorfoza-genesis/",
    external: true,
  },
  {
    vol: 2,
    name: "Carnival",
    date: "14. 2. 2026",
    href: "https://www.ch0.org/metamorfoza-carnival/",
    external: true,
  },
  { vol: 3, name: "Deep Sea", date: "12. 9. 2026", href: "/deep-sea" },
  { vol: 4, name: "Deep Throat", date: "31. 10. 2026", href: "/" },
];

/** Edicija, ki jo trenutno promoviramo na `/`. */
export const CURRENT_VOL = 4;
