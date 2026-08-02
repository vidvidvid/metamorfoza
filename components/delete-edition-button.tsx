"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteEditionAction } from "@/app/admin/cards/actions";

export function DeleteEditionButton({
  editionId,
  name,
}: {
  editionId: string;
  name: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (
          !confirm(
            `Izbrišem edicijo »${name}« skupaj z vsemi vpisi kartic in shiny vstopi? Tega ni mogoče razveljaviti.`,
          )
        )
          return;
        startTransition(async () => {
          const fd = new FormData();
          fd.set("id", editionId);
          try {
            await deleteEditionAction(fd);
            toast.success(`Edicija »${name}« izbrisana`);
            router.replace("/admin/cards");
          } catch {
            toast.error("Napaka pri brisanju edicije");
          }
        });
      }}
    >
      Izbriši edicijo
    </Button>
  );
}
