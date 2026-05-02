import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col items-center gap-8 px-6 py-24 text-center">
      <Image
        src="/metamorfoza-wordmark.png"
        alt="Metamorfoza"
        width={1600}
        height={950}
        priority
        sizes="(max-width: 768px) 80vw, 400px"
        className="h-auto w-full max-w-[400px]"
      />
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary/80">
        hvala
      </p>
      <h1 className="text-3xl font-semibold uppercase">Prijava oddana</h1>
      <p className="text-muted-foreground">
        Prejeli smo tvojo prijavo. Oglasimo se ti po e-pošti.
      </p>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Nazaj
      </Link>
    </main>
  );
}
