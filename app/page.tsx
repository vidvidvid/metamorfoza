import Image from "next/image";
import { SubmissionForm } from "@/components/submission-form";
import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16 sm:py-24">
      <header className="space-y-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary/80">
          !!! OPEN CALL !!!
        </p>
        <h1 className="sr-only">Metamorfoza</h1>
        <Image
          src="/metamorfoza-wordmark.png"
          alt="Metamorfoza"
          width={1600}
          height={950}
          priority
          sizes="(max-width: 768px) 90vw, 600px"
          className="mx-auto h-auto w-full max-w-[600px]"
        />
        <div className="space-y-1 text-lg sm:text-xl">
          <p className="font-medium tracking-wide">
            Soustvarjaj podzemlje Ljubljane
          </p>
          <p className="text-muted-foreground">
            Priložnost · Mladost · Fashion design · Sustainability
          </p>
        </div>
      </header>

      <section className="space-y-6 text-center">
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Tema
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Globočine morja
          </h2>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary/80">
            Extravaganza Speciål Couture
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          !! Material provided by <span className="font-semibold">ŠTOFF</span>{" "}
          !!
        </p>
        <p className="font-mono text-sm uppercase tracking-[0.2em]">
          Rok prijav: 31. 5. 2026
        </p>
      </section>

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

      <footer className="pt-8 text-center text-xs text-muted-foreground">
        <p>metamorfoza collective · Ljubljana</p>
      </footer>
    </main>
  );
}
