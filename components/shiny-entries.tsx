"use client";

import { useOptimistic, useRef, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  addShinyEntryAction,
  removeShinyEntryAction,
} from "@/app/admin/cards/actions";

export function ShinyEntries({
  editionId,
  entries,
}: {
  editionId: string;
  entries: number[];
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, startTransition] = useTransition();
  const [optimisticEntries, updateOptimistic] = useOptimistic(
    entries,
    (state, { cardNumber, remove }: { cardNumber: number; remove: boolean }) =>
      remove
        ? state.filter((n) => n !== cardNumber)
        : [...state, cardNumber],
  );

  const sorted = [...optimisticEntries].sort((a, b) => a - b);

  function handleAdd(formData: FormData) {
    const cardNumber = Number(formData.get("cardNumber"));
    if (!Number.isInteger(cardNumber) || cardNumber < 1) return;
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    if (optimisticEntries.includes(cardNumber)) {
      toast.info(`Shiny ${cardNumber} je že vpisana`);
      return;
    }
    startTransition(async () => {
      updateOptimistic({ cardNumber, remove: false });
      const fd = new FormData();
      fd.set("editionId", editionId);
      fd.set("cardNumber", String(cardNumber));
      try {
        const result = await addShinyEntryAction(fd);
        if (result.duplicate) {
          toast.info(`Shiny ${cardNumber} je že vpisana`);
        }
      } catch {
        toast.error(`Napaka pri vpisu shiny ${cardNumber}`);
      }
    });
  }

  function handleRemove(cardNumber: number) {
    startTransition(async () => {
      updateOptimistic({ cardNumber, remove: true });
      const fd = new FormData();
      fd.set("editionId", editionId);
      fd.set("cardNumber", String(cardNumber));
      try {
        await removeShinyEntryAction(fd);
      } catch {
        toast.error(`Napaka pri brisanju shiny ${cardNumber}`);
      }
    });
  }

  return (
    <section className="rounded-lg border border-amber-400/40 bg-gradient-to-br from-amber-400/10 to-yellow-400/5 p-4">
      <h2 className="text-sm font-semibold">
        ✦ Shiny kartice — prejšnja edicija{" "}
        <span className="font-normal text-muted-foreground">
          ({sorted.length})
        </span>
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Prost vstop s shiny kartico prejšnje edicije — vpiši njeno številko.
      </p>
      <form action={handleAdd} className="mt-3 flex gap-2">
        <Input
          ref={inputRef}
          name="cardNumber"
          type="number"
          inputMode="numeric"
          min={1}
          max={9999}
          placeholder="Št. kartice"
          required
          className="w-32"
        />
        <Button type="submit">Dodaj</Button>
      </form>
      {sorted.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {sorted.map((n) => (
            <li
              key={n}
              className="flex items-center gap-1 rounded-md border border-amber-400/50 bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500 py-1 pr-1 pl-2 text-sm font-medium text-amber-950 tabular-nums"
            >
              ✦ {n}
              <button
                type="button"
                onClick={() => handleRemove(n)}
                aria-label={`Odstrani shiny ${n}`}
                className="rounded px-1 text-amber-900/60 hover:bg-amber-900/10 hover:text-amber-950"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
