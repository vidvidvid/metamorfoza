import Image from "next/image";
import Link from "next/link";
import { logoutAction } from "@/app/admin/login/actions";

export function AdminShell({
  children,
  active = "prijave",
}: {
  children: React.ReactNode;
  active?: "prijave" | "kartice";
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/deep-sea/wordmark.webp"
            alt="Metamorfoza"
            width={931}
            height={348}
            sizes="160px"
            className="h-auto w-[160px]"
          />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            admin
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex gap-1 text-sm">
            <NavTab href="/admin" label="Prijave" active={active === "prijave"} />
            <NavTab
              href="/admin/cards"
              label="Karte"
              active={active === "kartice"}
            />
          </nav>
          <form action={logoutAction}>
            <button
              type="submit"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              Odjava
            </button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}

function NavTab({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "rounded bg-primary/15 px-3 py-1 font-medium text-primary"
          : "rounded px-3 py-1 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
      }
    >
      {label}
    </Link>
  );
}
