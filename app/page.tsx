import Image from "next/image";
import { MapPin, Clock, CalendarDays, ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/instagram-icon";
import { SubmissionForm } from "@/components/submission-form";
import { Countdown } from "@/components/countdown";
import { ReelVideo } from "@/components/reel-video";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { APPLICATIONS_CLOSED } from "@/lib/applications";
import {
  EVENT,
  DESIGNERS,
  LINEUP,
  DECOR,
  CREDITS,
  instagramUrl,
  type Person,
} from "@/lib/event";

const MARQUEE = [
  "Metamorfoza vol. 3",
  "Deep Sea",
  "Channel Zero",
  "12. 9. 2026",
  "22:30",
  "Your favorite sea creature",
];

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-20 px-6 pt-12 pb-16 sm:gap-28 sm:pt-20">
      {/* ---------- Hero ---------- */}
      <header className="flex flex-col items-center gap-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">
          Klubski večer · {EVENT.venue} · {EVENT.city}
        </p>
        <h1 className="sr-only">{EVENT.title}</h1>
        <Image
          src="/deep-sea/logo-vol3.webp"
          alt="Metamorfoza vol. 3: Deep Sea — Channel Zero, 12. 9. 2026"
          width={931}
          height={428}
          preload
          sizes="(max-width: 768px) 92vw, 720px"
          className="h-auto w-full max-w-[720px] drop-shadow-[0_0_40px_oklch(0.63_0.26_348/35%)]"
        />

        <p className="max-w-2xl text-balance text-lg leading-relaxed text-foreground/90 sm:text-xl">
          Deep Sea Extravaganza Special se vrača izpod morskega dna Marjanskega
          jaška, odeta v hitinaste luščine, na površje Ljubljane. V črnino bo
          luna zasijala skozi špranje v Channel Zero.
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
          <Pill icon={<CalendarDays className="size-3.5" />}>
            {EVENT.dateLabel}
          </Pill>
          <Pill icon={<Clock className="size-3.5" />}>{EVENT.timeLabel}</Pill>
          <Pill icon={<MapPin className="size-3.5" />}>
            {EVENT.venue}, {EVENT.city}
          </Pill>
        </ul>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={EVENT.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 rounded-full px-7 font-heading text-sm font-black uppercase tracking-[0.15em] shadow-[0_0_30px_oklch(0.63_0.26_348/40%)]",
            )}
          >
            Dogodek na ch0.org
            <ExternalLink className="size-4" />
          </a>
          <a
            href={EVENT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 rounded-full border-primary/40 bg-card/40 px-6 font-mono text-xs uppercase tracking-[0.25em] backdrop-blur-sm hover:border-primary hover:text-primary",
            )}
          >
            <InstagramIcon className="size-4" />
            {EVENT.instagramHandle}
          </a>
        </div>

        <Countdown />
      </header>

      {/* ---------- Tekoči trak ---------- */}
      <div aria-hidden className="marquee -mx-6 border-y border-primary/30 py-3">
        <div className="marquee-track">
          {[0, 1].map((copy) =>
            MARQUEE.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="headline text-2xl whitespace-nowrap sm:text-3xl"
              >
                {item}
                <span className="ml-12 text-primary/50">✦</span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* ---------- Bitje ---------- */}
      <section className="grid items-center gap-10 sm:grid-cols-[1.1fr_1fr] sm:gap-6">
        <div className="relative mx-auto w-full max-w-[420px] sm:max-w-none">
          <div
            aria-hidden
            className="absolute inset-[10%] -z-10 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.45 0.12 235 / 70%), oklch(0.63 0.26 348 / 25%) 55%, transparent 75%)",
            }}
          />
          <Image
            src="/deep-sea/monster.webp"
            alt="Cnth'ula — modro-vijolično bitje iz globočin z lovkami in kremplji"
            width={1400}
            height={1797}
            sizes="(max-width: 640px) 90vw, 520px"
            loading="eager"
            className="creature-glow float-slow h-auto w-full"
          />
        </div>
        <div className="space-y-6 text-center sm:text-left">
          <SectionLabel>Bitje edicije</SectionLabel>
          <h2 className="headline-outline text-5xl sm:text-6xl">
            {EVENT.creature.name}
          </h2>
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            <span aria-hidden>✦</span> {EVENT.creature.rarity}
          </p>
          <p className="text-muted-foreground">
            Iz morskega dna Marjanskega jaška prihaja na površje. Na vsaki
            karti tretje edicije. Bo tvoja shiny?
          </p>
          <div className="rounded-xl border border-primary/30 bg-card/60 p-5 backdrop-blur-sm">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
              Dress code
            </p>
            <p className="headline mt-2 text-2xl sm:text-3xl">
              {EVENT.dressCode}
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Oblikovalci ---------- */}
      <section className="space-y-8">
        <div className="space-y-3 text-center">
          <SectionLabel>Akvatične modne kreacije</SectionLabel>
          <h2 className="headline text-4xl sm:text-5xl">Na pisti</h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Izbrane iz odprtega razpisa <em>Globočine morja</em>. Hvala vsem,
            ki ste se prijavili!
          </p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-3">
          {DESIGNERS.map((p, i) => (
            <li key={p.name}>
              <PersonCard person={p} index={i + 1} featured />
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Sirene ---------- */}
      <section className="space-y-8">
        <div className="space-y-3 text-center">
          <SectionLabel>Polnočne sirene</SectionLabel>
          <h2 className="headline text-4xl sm:text-5xl">Za pultom</h2>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {LINEUP.map((p) => (
            <li key={p.name}>
              <PersonCard person={p} />
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Vstopnina + karta ---------- */}
      <section className="grid items-center gap-10 sm:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-3 text-center sm:text-left">
            <SectionLabel>Vstopnina</SectionLabel>
            <h2 className="headline text-4xl sm:text-5xl">Na vrata</h2>
          </div>
          <Card className="gap-5 border-primary/30 bg-card/70 p-6 backdrop-blur-sm sm:p-8">
            <div className="flex items-center justify-center gap-4 sm:justify-start">
              <PriceBlock price={EVENT.tickets.early} note={`do ${EVENT.tickets.cutoff}`} />
              <span aria-hidden className="headline text-3xl text-primary/40">
                /
              </span>
              <PriceBlock price={EVENT.tickets.late} note={`po ${EVENT.tickets.cutoff}`} />
            </div>
            <ul className="space-y-3 text-sm text-foreground/90">
              <li className="flex gap-3">
                <span aria-hidden className="mt-0.5 text-accent">◆</span>
                <span>
                  Pokaži <strong>navadno karto</strong> prejšnje Metamorfoze
                  in dobiš {EVENT.tickets.discount}.
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-0.5 text-primary">✦</span>
                <span>
                  Z <strong>rare / shiny karto</strong> vstopiš{" "}
                  <strong className="text-primary">ZASTONJ</strong>!!!
                </span>
              </li>
            </ul>
          </Card>
          <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground sm:text-left">
            Vsak obiskovalec dobi karto edicije
          </p>
        </div>
        <ReelVideo />
      </section>

      {/* ---------- Dekor in ekipa ---------- */}
      <section className="relative space-y-8 overflow-hidden">
        <Image
          aria-hidden
          src="/deep-sea/monster-lines.webp"
          alt=""
          width={1000}
          height={1320}
          sizes="480px"
          className="pointer-events-none absolute -top-10 -right-24 -z-10 h-auto w-[420px] opacity-[0.07] sm:w-[480px]"
        />
        <div className="space-y-3 text-center">
          <SectionLabel>Globočine okrašujejo</SectionLabel>
          <h2 className="headline text-4xl sm:text-5xl">
            Morske deklice in deček
          </h2>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {DECOR.map((p) => (
            <li key={p.name}>
              <PersonCard person={p} compact />
            </li>
          ))}
        </ul>
        <dl className="mx-auto grid max-w-2xl gap-x-8 gap-y-3 text-sm sm:grid-cols-3">
          {CREDITS.map(({ role, person }) => (
            <div key={role} className="text-center">
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                {role}
              </dt>
              <dd className="mt-1">
                <Handle person={person} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Prijavnica (samo dokler je razpis odprt) ---------- */}
      {!APPLICATIONS_CLOSED && (
        <Card className="border-border/40 bg-card/60 p-6 backdrop-blur-sm sm:p-10">
          <div className="mb-6 space-y-1">
            <h3 className="text-xl font-semibold">Prijavnica</h3>
            <p className="text-sm text-muted-foreground">
              Izpolni obrazec, priloži portfolio v PDF in svoj koncept. Polja z
              * so obvezna.
            </p>
          </div>
          <SubmissionForm />
        </Card>
      )}

      {/* ---------- Noga ---------- */}
      <footer className="flex flex-col items-center gap-8 pt-4 text-center">
        <p className="headline-outline text-3xl leading-tight sm:text-5xl">
          Morje je blo.
          <br />
          Morje je.
          <br />
          In morje bo.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={EVENT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="metamorfoza na Instagramu"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card/40 px-4 py-2 text-foreground/80 transition hover:border-primary hover:text-primary"
          >
            <InstagramIcon className="size-4" />
            <span className="font-mono text-xs uppercase tracking-[0.25em]">
              {EVENT.instagramHandle}
            </span>
          </a>
          <a
            href={EVENT.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] text-foreground/80 transition hover:border-accent hover:text-accent"
          >
            ch0.org
            <ExternalLink className="size-3.5" aria-hidden />
          </a>
        </div>
        <Image
          src="/deep-sea/wordmark.webp"
          alt="Metamorfoza"
          width={931}
          height={348}
          sizes="200px"
          className="h-auto w-[180px] opacity-80"
        />
        <p className="text-xs text-muted-foreground">
          Organizacija: Metamorfoza · {EVENT.city}
        </p>
      </footer>
    </main>
  );
}

/* ---------- Pomožne komponente ---------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">
      {children}
    </p>
  );
}

function Pill({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-3.5 py-1.5 text-foreground/90 backdrop-blur-sm">
      <span className="text-primary" aria-hidden>
        {icon}
      </span>
      {children}
    </li>
  );
}

function PriceBlock({ price, note }: { price: string; note: string }) {
  return (
    <div className="text-center sm:text-left">
      <p className="headline text-4xl sm:text-5xl">{price}</p>
      <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
        {note}
      </p>
    </div>
  );
}

function Handle({ person }: { person: Person }) {
  if (!person.handle) return <span>{person.name}</span>;
  return (
    <a
      href={instagramUrl(person.handle)}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-primary/50 underline-offset-4 transition hover:text-primary"
    >
      @{person.handle}
    </a>
  );
}

function PersonCard({
  person,
  index,
  featured = false,
  compact = false,
}: {
  person: Person;
  index?: number;
  featured?: boolean;
  compact?: boolean;
}) {
  const inner = (
    <>
      {index !== undefined && (
        <span className="font-mono text-xs tracking-[0.3em] text-accent">
          {String(index).padStart(2, "0")}
        </span>
      )}
      <span
        className={cn(
          "font-heading font-black uppercase leading-tight",
          featured ? "text-2xl" : compact ? "text-base" : "text-lg",
        )}
      >
        {person.name}
      </span>
      {person.handle && (
        <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-wide text-muted-foreground group-hover:text-primary">
          <InstagramIcon className="size-3" />@{person.handle}
        </span>
      )}
    </>
  );

  const className = cn(
    "group flex h-full flex-col gap-2 rounded-xl border bg-card/60 backdrop-blur-sm transition",
    featured
      ? "border-primary/40 p-6 shadow-[0_0_40px_oklch(0.63_0.26_348/12%)] hover:border-primary hover:shadow-[0_0_50px_oklch(0.63_0.26_348/28%)]"
      : "border-border/40 p-4 hover:border-accent/60",
  );

  if (!person.handle) return <div className={className}>{inner}</div>;

  return (
    <a
      href={instagramUrl(person.handle)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {inner}
    </a>
  );
}
