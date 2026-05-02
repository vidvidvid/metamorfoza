import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getSession();
  if (session.isAdmin) redirect("/admin");

  return (
    <main className="mx-auto flex w-full max-w-sm flex-col gap-8 px-6 py-24">
      <header className="space-y-4 text-center">
        <Image
          src="/metamorfoza-wordmark.png"
          alt="Metamorfoza"
          width={1600}
          height={950}
          priority
          sizes="280px"
          className="mx-auto h-auto w-full max-w-[280px]"
        />
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary/80">
          admin
        </p>
      </header>
      <LoginForm />
    </main>
  );
}
