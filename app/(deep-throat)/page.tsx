import Image from "next/image";
import {
  Clock,
  CalendarDays,
  ExternalLink,
  Disc3,
  Headphones,
  Ghost,
  Drama,
  Skull,
} from "lucide-react";
import { InstagramIcon } from "@/components/instagram-icon";
import { Countdown } from "@/components/countdown";
import { EditionNav } from "@/components/edition-nav";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { instagramUrl, type Person } from "@/lib/people";
import {
  EVENT,
  TIMELINE,
  CHILL_ZONE,
  CREW,
  type Act,
  type Slot,
} from "@/lib/editions/deep-throat";

const MARQUEE = [
  "Metamorfoza vol. 4",
  "Deep Throat",
  "喉神",
  "Noč čarovnic",
  "Channel Zero",
  "31. 10. 2026",
  "22:30",
  "Maske obvezno",
  "Blacklight",
];

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-20 px-6 pt-10 pb-16 sm:gap-28 sm:pt-16">
      {/* ---------- Hero ---------- */}
      <header className="relative">
        <Image
          aria-hidden
          src="/deep-throat/ornament-desno.webp"
          alt=""
          width={312}
          height={502}
          sizes="200px"
          className="pointer-events-none absolute -top-8 -right-6 -z-10 hidden h-auto w-[170px] opacity-40 sm:block lg:-right-24"
        />
        <Image
          aria-hidden
          src="/deep-throat/ornament-levo.webp"
          alt=""
          width={88}
          height={174}
          sizes="80px"
          className="pointer-events-none absolute -bottom-10 -left-4 -z-10 hidden h-auto w-[64px] opacity-40 sm:block lg:-left-20"
        />

        <p className="mb-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center font-mono text-xs uppercase tracking-[0.4em] text-accent sm:mb-20">
          <span>Noč čarovnic · Metamorfoza</span>
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            ×
            <Ch0Emblem className="h-7 w-auto" />
            {EVENT.partner}
          </span>
        </p>
        <h1 className="sr-only">{EVENT.title}</h1>

        {/* Soorganizatorja: Metamorfoza ~ goo (lime -> črno-rdeča) ~ Channel Zero.
            Logotip Metamorfoze je v istem goo filtru kot most, da se lovka z
            njim zlije kot metaball; Channel Zero je zunaj (ostre konice), temna
            lovka se podvije pod emblem. */}
        <div className="logo-lockup mb-12 sm:mb-14">
          <div className="logo-lockup-goo">
            <Image
              src="/deep-throat/logo.webp"
              alt="Metamorfoza"
              width={748}
              height={253}
              preload
              sizes="(max-width: 640px) 88vw, 460px"
            />
            <LogoGoo />
          </div>
          <Image
            src="/deep-throat/ch0-logo.webp"
            alt="Channel Zero"
            width={700}
            height={119}
            preload
            sizes="(max-width: 640px) 88vw, 460px"
            className="relative z-20 h-auto w-full max-w-[460px] drop-shadow-[0_0_16px_oklch(0.96_0.02_100/40%)]"
          />
        </div>

        <div className="grid items-center gap-8 sm:grid-cols-[1.1fr_0.9fr] sm:gap-x-6 sm:gap-y-10">
          <div className="flex flex-col items-center gap-5 text-center sm:items-start sm:text-left">
            <p className="flex flex-col items-center gap-1 sm:items-start">
              <span className="dt-tag text-2xl sm:text-3xl">vol. 4:</span>
              <span className="dt-title uv-flicker text-[2.9rem] sm:text-7xl">
                {EVENT.name}
              </span>
              <span
                lang="ja"
                className="dt-kanji text-3xl text-accent sm:text-4xl"
              >
                {EVENT.kanji}
              </span>
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[340px] sm:row-span-2 sm:max-w-none">
            <div
              aria-hidden
              className="absolute inset-[8%] -z-10 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.66 0.23 347 / 55%), oklch(0.85 0.18 115 / 18%) 55%, transparent 75%)",
              }}
            />
            <Image
              src="/deep-throat/creature.webp"
              alt="Nodoshin 喉神 - mesnato bitje z dolgim rdečim jezikom, ki se izvija iz sluznice (ilustracija sitri.wtf)"
              width={716}
              height={1013}
              sizes="(max-width: 640px) 85vw, 440px"
              loading="eager"
              fetchPriority="high"
              className="creature-uv float-slow h-auto w-full"
            />
          </div>

          <div className="flex flex-col items-center gap-7 text-center sm:items-start sm:text-left">
            <p className="max-w-xl text-balance text-lg leading-relaxed text-foreground/90 sm:text-xl">
              Meja med tostranstvom in onostranstvom se raztegne v tanko, vlažno
              sluznico. Globoko v požiralniku Metelkove se zgane{" "}
              <strong className="font-semibold text-primary">
                {EVENT.creature.name}
              </strong>{" "}
              <span lang="ja" className="dt-kanji whitespace-nowrap text-accent">
                {EVENT.creature.kanji}
              </span>{" "}
 - božanstvo, ki ne govori, temveč golta.
            </p>

            <ul className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.2em] sm:justify-start">
              <Pill icon={<CalendarDays className="size-3.5" />}>
                {EVENT.dateLabel}
              </Pill>
              <Pill icon={<Clock className="size-3.5" />}>{EVENT.timeLabel}</Pill>
              <Pill icon={<Ch0Emblem className="h-5 w-auto" />}>
                {EVENT.venue}, {EVENT.city}
              </Pill>
            </ul>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <a
                href={EVENT.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-full px-7 font-heading text-sm font-black uppercase tracking-[0.15em] shadow-[0_0_30px_oklch(0.85_0.18_115/40%)]",
                )}
              >
                <Ch0Emblem className="h-6 w-auto" />
                ch0.org
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

            <Countdown
              target={EVENT.startsAt}
              label="Do rituala"
              doneLabel="Ritual se je začel"
              doneClassName="dt-title"
            />
          </div>
        </div>
      </header>

      {/* ---------- Tekoči trak ---------- */}
      <div aria-hidden className="marquee -mx-6 border-y border-primary/30 py-3">
        <div className="marquee-track">
          {[0, 1].map((copy) =>
            MARQUEE.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className={cn(
                  "text-2xl whitespace-nowrap sm:text-3xl",
                  item === "喉神"
                    ? "dt-kanji text-accent"
                    : i % 2
                      ? "dt-tag"
                      : "dt-horror text-xl sm:text-2xl",
                )}
              >
                {item}
                <span className="ml-12 text-primary/60">👅</span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* ---------- Bitje + dress code ---------- */}
      <section className="relative grid items-center gap-10 sm:grid-cols-2">
        <span
          aria-hidden
          lang="ja"
          className="dt-kanji pointer-events-none absolute -top-16 right-0 -z-10 leading-none text-[11rem] text-primary/[0.06] select-none sm:-top-24 sm:text-[18rem]"
        >
          {EVENT.creature.kanji}
        </span>
        <div className="space-y-6 text-center sm:text-left">
          <SectionLabel>Bitje edicije</SectionLabel>
          <h2 className="flex flex-col items-center gap-2 sm:items-start">
            <span className="dt-title text-5xl sm:text-6xl">
              {EVENT.creature.name}
            </span>
            <span
              lang="ja"
              className="dt-kanji text-3xl text-accent sm:text-4xl"
            >
              {EVENT.creature.kanji}
            </span>
          </h2>
          <p className="text-muted-foreground">
            {EVENT.creature.tagline} Noč ritualov. Na vsaki karti četrte
            edicije. Bo tvoja <span className="shiny">shiny</span>?
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Card art &amp; design:{" "}
            <a
              href={instagramUrl("sitri.wtf")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-accent/40 underline-offset-4 transition hover:text-primary"
            >
              @sitri.wtf
            </a>
          </p>
        </div>
        <div className="screen p-6 sm:p-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] opacity-70">
            Dress code
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="dt-title text-5xl sm:text-6xl">
              {EVENT.dressCode}
            </span>
            <span className="dt-tag text-xl sm:text-2xl">(obvezno)</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed font-medium sm:text-base">
            {EVENT.dressCodeNote}
          </p>
          <p aria-hidden className="mt-4 text-2xl tracking-[0.2em]">
            🎭🤢💚🕯️👅
          </p>
        </div>
      </section>

      {/* ---------- Potek noči ---------- */}
      <section className="relative space-y-8">
        <Image
          aria-hidden
          src="/deep-throat/ornament-desno.webp"
          alt=""
          width={312}
          height={502}
          sizes="160px"
          className="pointer-events-none absolute -top-10 -right-8 -z-10 hidden h-auto w-[130px] opacity-25 sm:block lg:-right-28"
        />
        <div className="space-y-3 text-center">
          <SectionLabel>Program · 22:30 → 06:00</SectionLabel>
          <h2 className="dt-title text-4xl sm:text-5xl">Potek noči</h2>
          <p className="dt-tag text-2xl sm:text-3xl">
            DJs <span className="text-lg sm:text-xl">&amp;</span> performance
          </p>
        </div>

        <div className="screen flex items-start gap-4 p-5 sm:items-center sm:gap-5 sm:p-6">
          <span aria-hidden className="text-3xl leading-none sm:text-4xl">
            {CHILL_ZONE.emoji}
          </span>
          <div className="space-y-1">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] opacity-70">
              {CHILL_ZONE.when}
            </p>
            <p className="font-heading text-xl font-black uppercase leading-tight">
              {CHILL_ZONE.title}
            </p>
            <p className="text-sm font-medium leading-relaxed">{CHILL_ZONE.text}</p>
          </div>
        </div>

        <Timeline />
      </section>

      {/* ---------- Vstopnina + karta ---------- */}
      <section className="grid items-center gap-10 sm:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-3 text-center sm:text-left">
            <SectionLabel>Vstopnina</SectionLabel>
            <h2 className="dt-title text-4xl sm:text-5xl">Na vratih</h2>
          </div>
          <Card className="gap-5 border-primary/30 bg-card/70 p-6 backdrop-blur-sm sm:p-8">
            <div className="flex items-center justify-center gap-4 sm:justify-start">
              <PriceBlock
                price={EVENT.tickets.early}
                note={`do ${EVENT.tickets.cutoff}`}
              />
              <span
                aria-hidden
                className="font-heading text-3xl leading-none font-black text-primary/40"
              >
                /
              </span>
              <PriceBlock
                price={EVENT.tickets.late}
                note={`po ${EVENT.tickets.cutoff}`}
              />
            </div>
            <ul className="space-y-3 text-sm text-foreground/90">
              <li className="flex gap-3">
                <span aria-hidden className="mt-0.5 text-accent">
                  ◆
                </span>
                <span>
                  Pokaži <strong>navadno karto</strong> prejšnje Metamorfoze (
                  {EVENT.tickets.previousEdition}) in dobiš{" "}
                  {EVENT.tickets.discount}.
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-0.5 text-primary">
                  ✦
                </span>
                <span>
                  Z <strong>rare / shiny karto</strong> 3. edicije (
                  {EVENT.tickets.previousEdition}) vstopiš{" "}
                  <strong className="dt-horror text-base">zastonj</strong>
                  !!!
                </span>
              </li>
            </ul>
          </Card>
          <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground sm:text-left">
            Vsak obiskovalec dobi karto edicije
          </p>
        </div>
        <HoloCard />
      </section>

      {/* ---------- Ekipa ---------- */}
      <section className="relative space-y-8">
        <div className="space-y-3 text-center">
          <SectionLabel>Drobovje okrašujejo</SectionLabel>
          <h2 className="dt-title text-4xl sm:text-5xl">Ekipa</h2>
        </div>
        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {CREW.map((person) => (
            <li key={person.name}>
              <CrewCard person={person} />
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Ključniki ---------- */}
      <ul
        aria-label="Ključniki"
        className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.2em]"
      >
        {EVENT.hashtags.map((tag, i) => (
          <li key={tag} className={i % 2 ? "text-accent" : "text-primary"}>
            #{tag}
          </li>
        ))}
      </ul>

      {/* ---------- Noga ---------- */}
      <footer className="flex flex-col items-center gap-8 pt-4 text-center">
        <p className="dt-horror text-3xl sm:text-5xl">
          Ne govori.
          <br />
          Goltaj.
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
        <EditionNav current={EVENT.vol} />
        <Image
          src="/deep-throat/splat.webp"
          alt=""
          width={199}
          height={193}
          sizes="72px"
          className="h-auto w-[72px] opacity-70"
        />
        <p className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span>Organizacija: Metamorfoza ×</span>
          <Ch0Emblem className="h-6 w-auto" />
          <span>
            {EVENT.partner} · {EVENT.city}
          </span>
        </p>
      </footer>
    </main>
  );
}

/* ---------- Pomožne komponente ---------- */

/* Goo med logotipoma soorganizatorjev (znotraj .logo-lockup-goo, ki nosi
   filter #goo skupaj z logotipom Metamorfoze). Lime na levi se preliva v
   črno-rdečo Channel Zera; z mostu kapljajo kaplje. */
function LogoGoo() {
  return (
    <span aria-hidden className="logo-goo">
      <span className="logo-goo-blobs">
        <i className="lg-tendril lg-tendril-a" />
        <i className="lg-tendril lg-tendril-b" />
        <i className="lg-tip lg-tip-a" />
        <i className="lg-tip lg-tip-b" />
        <i className="lg-flow lg-flow-1" />
        <i className="lg-flow lg-flow-2" />
        <i className="lg-flow lg-flow-3" />
        <i className="lg-drip lg-drip-1" />
        <i className="lg-drip lg-drip-2" />
        <i className="lg-drip lg-drip-3" />
        <i className="lg-sat" />
        <i className="lg-blob" />
      </span>
    </span>
  );
}

/* Emblem Channel Zero (soorganizator): zmaj v ovalu s konicami. */
function Ch0Emblem({ className }: { className?: string }) {
  return (
    <Image
      src="/deep-throat/ch0-emblem.webp"
      alt="Channel Zero"
      width={144}
      height={119}
      className={cn(
        "inline-block shrink-0 drop-shadow-[0_0_6px_oklch(0.96_0.02_100/45%)]",
        className,
      )}
    />
  );
}

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
      <p className="dt-title text-4xl sm:text-5xl">{price}</p>
      <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
        {note}
      </p>
    </div>
  );
}

/* Navpična časovnica: ura levo, črta s točko, vsebina desno. Število ovalov
   na tabletki = zaporedni DJ set, magenta oval = performans. */
function Timeline() {
  let setIndex = 0;
  const rows = TIMELINE.map((slot) => ({
    slot,
    ovals: slot.kind === "set" ? ++setIndex : 0,
  }));
  const rowClass =
    "relative grid grid-cols-[5.5rem_1fr] gap-x-5 pb-8 sm:grid-cols-[7.5rem_1fr] sm:gap-x-8";

  return (
    <ol className="relative">
      {/* Črevo namesto črte: ploščica se ponavlja navpično in počasi leze navzdol. */}
      <div
        aria-hidden
        className="gut-line absolute top-2 bottom-2 left-[calc(5.5rem-24px)] sm:left-[calc(7.5rem-24px)]"
      />
      {rows.map(({ slot, ovals }, i) => (
        <li key={i} className={rowClass}>
          <TimeStamp start={slot.start} end={"end" in slot ? slot.end : undefined} />
          <TimeMarker
            kind={slot.kind}
            b2b={slot.kind === "set" && slot.acts.length > 1}
          />
          {slot.kind === "set" && <SetCard acts={slot.acts} ovals={ovals} />}
          {slot.kind === "performance" && (
            <PerformanceCard act={slot.act} text={slot.text} />
          )}
          {slot.kind === "contest" && <ContestCard slot={slot} />}
        </li>
      ))}
      <li className={cn(rowClass, "pb-0")}>
        <TimeStamp start="06:00" />
        <TimeMarker kind="end" />
        <p className="pt-1.5 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Konec. Nodoshin te izpljune.
        </p>
      </li>
    </ol>
  );
}

function TimeStamp({ start, end }: { start: string; end?: string }) {
  return (
    <div className="pt-1 pr-6 text-right sm:pr-7">
      <span className="dt-title text-lg tabular-nums sm:text-2xl">{start}</span>
      {end && (
        <span className="block font-mono text-[0.6rem] tracking-[0.2em] text-muted-foreground tabular-nums">
          do {end}
        </span>
      )}
    </div>
  );
}

function TimeMarker({
  kind,
  b2b,
}: {
  kind: Slot["kind"] | "end";
  b2b?: boolean;
}) {
  const Icon =
    kind === "set"
      ? b2b
        ? Headphones
        : Disc3
      : kind === "performance"
        ? Ghost
        : kind === "contest"
          ? Drama
          : Skull;
  return (
    <span
      aria-hidden
      className={cn(
        "absolute top-0 left-[4.5rem] flex size-8 items-center justify-center rounded-full border bg-background sm:left-[6.5rem]",
        kind === "set" &&
          "border-primary/60 text-primary shadow-[0_0_18px_oklch(0.85_0.18_115/50%)]",
        kind === "performance" &&
          "border-accent/70 text-accent shadow-[0_0_18px_oklch(0.66_0.23_347/55%)]",
        kind === "contest" &&
          "border-primary bg-primary text-primary-foreground shadow-[0_0_22px_oklch(0.85_0.18_115/70%)]",
        kind === "end" && "border-border text-muted-foreground",
      )}
    >
      <Icon className="size-4" strokeWidth={2.25} />
    </span>
  );
}

function SlotCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-primary/30 bg-card/60 p-5 backdrop-blur-sm">
      {children}
    </div>
  );
}

/* Solo set: ime na sredini nad opisom. b2b: obe imeni v isti vrstici, goo
   vmes (na mobilnem med obema blokoma), opisa pod njima. Bloki so z-10, da
   lovke goo-ja lezejo pod njimi. */
function SetCard({ acts, ovals }: { acts: Act[]; ovals: number }) {
  if (acts.length === 1) {
    return (
      <SlotCard>
        <ActHeader act={acts[0]} ovals={ovals} />
        <ActBio act={acts[0]} />
      </SlotCard>
    );
  }
  const [a, b] = acts;
  return (
    <SlotCard>
      <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:grid-rows-[auto_auto] md:gap-x-6 md:gap-y-4">
        <div className="relative z-10 md:col-start-1 md:row-start-1">
          <ActHeader act={a} ovals={ovals} />
        </div>
        <div className="relative z-10 md:col-start-1 md:row-start-2">
          <ActBio act={a} />
        </div>
        <B2BGoo variant={ovals} />
        <div className="relative z-10 md:col-start-3 md:row-start-1">
          <ActHeader act={b} ovals={ovals} />
        </div>
        <div className="relative z-10 md:col-start-3 md:row-start-2">
          <ActBio act={b} />
        </div>
      </div>
    </SlotCard>
  );
}

/* Most iz sluzi med b2b parom: lovki ves čas povezujeta obe imeni, po njima
   potujejo grude goo-ja, v sredini glavni mehurček z napisom (filter #goo
   vse zlije v eno gmoto). */
function B2BGoo({ variant }: { variant: number }) {
  return (
    <span
      role="img"
      aria-label="b2b"
      className={cn(
        "b2b-goo justify-self-center md:col-start-2 md:row-span-2 md:row-start-1 md:-mt-4 md:self-start",
        variant % 2 === 0 ? "b2b-goo-even" : "b2b-goo-odd",
      )}
    >
      <span aria-hidden className="b2b-goo-blobs">
        <i className="b2b-tendril b2b-tendril-a" />
        <i className="b2b-tendril b2b-tendril-b" />
        <i className="b2b-tip b2b-tip-a" />
        <i className="b2b-tip b2b-tip-b" />
        <i className="b2b-flow b2b-flow-1" />
        <i className="b2b-flow b2b-flow-2" />
        <i className="b2b-flow b2b-flow-3" />
        <i className="b2b-blob b2b-blob-2" />
        <i className="b2b-blob b2b-blob-3" />
        <i className="b2b-blob b2b-blob-1" />
      </span>
      <span aria-hidden className="b2b-goo-label">
        b2b
      </span>
    </span>
  );
}

function PerformanceCard({ act, text }: { act: Act; text: string }) {
  return (
    <SlotCard>
      <ActHeader act={act} ovals={0} />
      <ActBio act={{ ...act, bio: text }} />
    </SlotCard>
  );
}

function ContestCard({ slot }: { slot: Extract<Slot, { kind: "contest" }> }) {
  return (
    <SlotCard>
      <h3 className="dt-title text-2xl sm:text-3xl">{slot.title}</h3>
      <p className="dt-tag mt-1 text-lg sm:text-xl">{slot.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-foreground/85">{slot.text}</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {slot.prizes.map((prize, i) => (
          <li
            key={prize.place}
            className={cn(
              "flex flex-col gap-1.5 rounded-lg p-4",
              i === 0 ? "screen" : "border border-primary/30 bg-background/40",
            )}
          >
            <span
              className={cn(
                "font-mono text-[0.65rem] uppercase tracking-[0.3em]",
                i === 0 ? "opacity-70" : "text-accent",
              )}
            >
              {prize.place}
            </span>
            <span
              className={cn(
                "font-heading text-lg leading-tight font-black uppercase",
                i === 0 && "dt-title text-2xl",
              )}
            >
              {prize.title}
            </span>
            <span className={cn("text-sm leading-relaxed", i === 0 ? "font-medium" : "text-foreground/85")}>
              {prize.text}
            </span>
            <span className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-1">
              {prize.people.map((person) => (
                <a
                  key={person.handle}
                  href={instagramUrl(person.handle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-wide transition",
                    i === 0
                      ? "opacity-80 hover:opacity-100"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  <InstagramIcon className="size-3" />@{person.handle}
                </a>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </SlotCard>
  );
}

/* Črna tabletka z ovali kot na plakatu. */
function PillBadge({
  ovals,
  children,
}: {
  ovals: number;
  children: React.ReactNode;
}) {
  return (
    <span className="pill-badge">
      <span className="flex items-center gap-1" aria-hidden>
        {ovals === 0 ? (
          <span className="pill-oval pill-oval-accent" />
        ) : (
          Array.from({ length: ovals }, (_, i) => (
            <span key={i} className="pill-oval" />
          ))
        )}
      </span>
      <span className="pill-name">{children}</span>
    </span>
  );
}

function ActHeader({ act, ovals }: { act: Act; ovals: number }) {
  const glow =
    ovals === 0
      ? "hover:drop-shadow-[0_0_14px_oklch(0.66_0.23_347/60%)]"
      : "hover:drop-shadow-[0_0_14px_oklch(0.85_0.18_115/60%)]";
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <a
        href={instagramUrl(act.handle!)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("max-w-full transition", glow)}
      >
        <PillBadge ovals={ovals}>
          {act.name}
          {act.emoji && <span aria-hidden> {act.emoji}</span>}
        </PillBadge>
      </a>
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent">
        {act.role}
      </p>
    </div>
  );
}

function ActBio({ act }: { act: Act }) {
  return (
    <div className="mt-3 flex flex-col gap-2 md:mt-0">
      <p className="text-sm leading-relaxed text-foreground/85">{act.bio}</p>
      <a
        href={instagramUrl(act.handle!)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-wide text-muted-foreground transition hover:text-primary"
      >
        <InstagramIcon className="size-3" />@{act.handle}
      </a>
    </div>
  );
}

function CrewCard({ person }: { person: Person }) {
  const inner = (
    <div className="flex items-start gap-3">
      <Avatar person={person} size={48} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {person.role && (
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent">
            {person.role}
          </span>
        )}
        <span className="font-heading text-lg leading-tight font-black uppercase sm:text-xl">
          {person.name}
        </span>
        {person.handle && (
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-wide text-muted-foreground group-hover:text-primary">
            <InstagramIcon className="size-3" />@{person.handle}
          </span>
        )}
      </div>
    </div>
  );

  const className =
    "group flex h-full flex-col rounded-xl border border-primary/40 bg-card/60 p-4 shadow-[0_0_40px_oklch(0.85_0.18_115/10%)] backdrop-blur-sm transition hover:border-primary hover:shadow-[0_0_50px_oklch(0.85_0.18_115/24%)] sm:p-5";

  const href = person.handle ? instagramUrl(person.handle) : person.url;
  if (!href) return <div className={className}>{inner}</div>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {inner}
    </a>
  );
}

function Avatar({ person, size }: { person: Person; size: number }) {
  const style = { width: size, height: size };
  if (person.avatar) {
    return (
      <Image
        src={person.avatar}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover ring-1 ring-primary/40"
        style={style}
      />
    );
  }
  return (
    <span
      aria-hidden
      style={style}
      className="flex shrink-0 items-center justify-center rounded-full bg-secondary/60 font-heading text-sm font-black text-foreground/80 ring-1 ring-border/60"
    >
      {person.name.charAt(0).toUpperCase()}
    </span>
  );
}

/* Karta edicije: požiralnik, Nodoshin in holografski odsev. */
function HoloCard() {
  return (
    <div className="float-slow relative mx-auto aspect-[5/7] w-full max-w-[300px] overflow-hidden rounded-2xl border-[3px] border-primary/70 bg-[oklch(0.21_0.045_8)] shadow-[0_0_60px_oklch(0.66_0.23_347/30%)]">
      <Image
        src="/deep-throat/bg-throat.webp"
        alt=""
        fill
        sizes="300px"
        className="object-cover opacity-80"
      />
      <Image
        src="/deep-throat/creature-sm.webp"
        alt=""
        width={400}
        height={566}
        sizes="260px"
        className="absolute inset-x-[8%] top-[6%] h-auto w-[84%] drop-shadow-[0_0_20px_oklch(0.66_0.23_347/60%)]"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/85 to-transparent p-4">
        <span className="dt-title text-lg">{EVENT.creature.name}</span>
        <span lang="ja" className="dt-kanji text-xl text-accent">
          {EVENT.creature.kanji}
        </span>
      </div>
      <span className="absolute top-3 left-3 font-mono text-[0.6rem] tracking-[0.3em] text-primary">
        VOL. 4
      </span>
      <span className="shiny absolute top-3 right-3 font-mono text-[0.6rem] tracking-[0.3em]">
        SHINY?
      </span>
      <div aria-hidden className="holo pointer-events-none absolute inset-0" />
    </div>
  );
}
