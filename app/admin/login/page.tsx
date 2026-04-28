import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getSession();
  if (session.isAdmin) redirect("/admin");

  return (
    <main className="mx-auto flex w-full max-w-sm flex-col gap-8 px-6 py-24">
      <header className="space-y-2 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary/80">
          admin
        </p>
        <h1 className="wordmark text-4xl font-bold uppercase">
          Metamorfoza
        </h1>
      </header>
      <LoginForm />
    </main>
  );
}
