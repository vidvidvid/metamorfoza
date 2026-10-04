import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { EDITIONS } from "@/lib/editions";
import { cn } from "@/lib/utils";

// Preklop med edicijami: trenutna je označena, arhivirane vodijo na svojo
// stran ali na ch0.org. Barve pridejo iz teme edicije, na kateri je prikazan.
export function EditionNav({ current }: { current: number }) {
  return (
    <nav aria-label="Edicije" className="flex flex-col items-center gap-3">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
        Edicije
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {EDITIONS.map((edition) => {
          const active = edition.vol === current;
          const className = cn(
            "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] transition",
            active
              ? "border-primary bg-primary/15 text-primary"
              : "border-border/50 bg-card/40 text-foreground/75 hover:border-primary hover:text-primary",
          );
          const label = (
            <>
              <span className={active ? "text-primary" : "text-accent"}>
                {String(edition.vol).padStart(2, "0")}
              </span>
              <span>{edition.name}</span>
              <span className="tracking-normal text-muted-foreground normal-case">
                {edition.date}
              </span>
            </>
          );

          if (active) {
            return (
              <li key={edition.vol}>
                <span aria-current="page" className={className}>
                  {label}
                </span>
              </li>
            );
          }
          if (edition.external) {
            return (
              <li key={edition.vol}>
                <a
                  href={edition.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {label}
                  <ExternalLink className="size-3" aria-hidden />
                </a>
              </li>
            );
          }
          return (
            <li key={edition.vol}>
              <Link href={edition.href} className={className}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
