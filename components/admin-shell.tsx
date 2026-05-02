import Image from "next/image";
import Link from "next/link";
import { logoutAction } from "@/app/admin/login/actions";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="mb-10 flex items-center justify-between gap-4">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/metamorfoza-wordmark.png"
            alt="Metamorfoza"
            width={1600}
            height={950}
            sizes="160px"
            className="h-auto w-[160px]"
          />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            admin
          </span>
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            Odjava
          </button>
        </form>
      </header>
      {children}
    </div>
  );
}
