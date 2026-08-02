"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { CardEdition } from "@/lib/db/schema";
import {
  createEditionAction,
  deleteEditionAction,
  updateEditionAction,
} from "@/app/admin/cards/actions";

export function NewEditionDialog() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await createEditionAction(formData);
        toast.success("Edicija ustvarjena");
        setOpen(false);
      } catch {
        toast.error("Napaka pri ustvarjanju edicije");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" />}>＋ Nova edicija</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova edicija</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="new-name">Ime</Label>
            <Input
              id="new-name"
              name="name"
              placeholder="npr. Metamorfoza 2026"
              required
              maxLength={200}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="new-count">Št. kart</Label>
            <Input
              id="new-count"
              name="cardCount"
              type="number"
              inputMode="numeric"
              min={1}
              max={2000}
              defaultValue={220}
              required
            />
          </div>
          <Button type="submit" disabled={pending}>
            Ustvari
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function EditEditionDialog({ edition }: { edition: CardEdition }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await updateEditionAction(formData);
        toast.success("Edicija shranjena");
        setOpen(false);
      } catch {
        toast.error("Napaka pri shranjevanju edicije");
      }
    });
  }

  function handleDelete() {
    if (
      !confirm(
        `Izbrišem edicijo »${edition.name}« skupaj z vsemi vpisi kart in shiny vstopi? Tega ni mogoče razveljaviti.`,
      )
    )
      return;
    startTransition(async () => {
      const fd = new FormData();
      fd.set("id", edition.id);
      try {
        await deleteEditionAction(fd);
        toast.success(`Edicija »${edition.name}« izbrisana`);
        setOpen(false);
        router.replace("/admin/cards");
      } catch {
        toast.error("Napaka pri brisanju edicije");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" variant="outline" />}>
        Uredi
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Uredi edicijo »{edition.name}«</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="grid gap-4">
          <input type="hidden" name="id" value={edition.id} />
          <div className="grid gap-1.5">
            <Label htmlFor="edit-name">Ime</Label>
            <Input
              id="edit-name"
              name="name"
              defaultValue={edition.name}
              required
              maxLength={200}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="edit-count">Št. kart</Label>
            <Input
              id="edit-count"
              name="cardCount"
              type="number"
              inputMode="numeric"
              min={1}
              max={2000}
              defaultValue={edition.cardCount}
              required
            />
          </div>
          <Button type="submit" disabled={pending}>
            Shrani
          </Button>
        </form>
        <div className="border-t border-border/40 pt-3">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={pending}
            onClick={handleDelete}
          >
            Izbriši edicijo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
