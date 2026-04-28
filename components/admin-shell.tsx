import Link from "next/link";
import { logoutAction } from "@/app/admin/login/actions";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="mb-10 flex items-center justify-between">
        <Link href="/admin" className="wordmark text-2xl font-bold uppercase">
          Metamorfoza · admin
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
