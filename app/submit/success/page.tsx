import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col items-center gap-8 px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary/80">
        hvala
      </p>
      <h1 className="wordmark text-5xl font-bold uppercase">
        Prijava oddana
      </h1>
      <p className="text-muted-foreground">
        Prejeli smo tvojo prijavo. Oglasimo se ti po e-pošti.
      </p>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Nazaj
      </Link>
    </main>
  );
}
