"use client";

import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { CardMarkType } from "@/lib/db/schema";
import { setCardMarkAction } from "@/app/admin/cards/actions";

type MarkState = CardMarkType | "none";

const NEXT_MARK: Record<MarkState, MarkState> = {
  none: "entry",
  entry: "shiny",
  shiny: "none",
};

const MARK_CLASS: Record<MarkState, string> = {
  none: "border-border/60 bg-card/40 text-muted-foreground hover:bg-muted/40 hover:text-foreground",
  entry: "border-transparent bg-primary text-primary-foreground",
  shiny:
    "border-transparent bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500 text-amber-950",
};

export function CardGrid({
  editionId,
  cardCount,
  marks,
}: {
  editionId: string;
  cardCount: number;
  marks: Record<number, CardMarkType>;
}) {
  const [, startTransition] = useTransition();
  const [optimisticMarks, setOptimisticMark] = useOptimistic(
    marks,
    (state, { cardNumber, mark }: { cardNumber: number; mark: MarkState }) => {
      const next = { ...state };
      if (mark === "none") delete next[cardNumber];
      else next[cardNumber] = mark;
      return next;
    },
  );

  const entryCount = Object.values(optimisticMarks).filter(
    (m) => m === "entry",
  ).length;
  const shinyCount = Object.values(optimisticMarks).filter(
    (m) => m === "shiny",
  ).length;

  function handleTap(cardNumber: number) {
    const current: MarkState = optimisticMarks[cardNumber] ?? "none";
    const next = NEXT_MARK[current];
    startTransition(async () => {
      setOptimisticMark({ cardNumber, mark: next });
      const fd = new FormData();
      fd.set("editionId", editionId);
      fd.set("cardNumber", String(cardNumber));
      fd.set("mark", next);
      try {
        await setCardMarkAction(fd);
      } catch {
        toast.error(`Napaka pri shranjevanju karte ${cardNumber}`);
      }
    });
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <span>
          <span className="mr-1.5 inline-block size-2.5 rounded-full bg-primary" />
          Vstop: <strong className="tabular-nums">{entryCount}</strong>
        </span>
        <span>
          <span className="mr-1.5 inline-block size-2.5 rounded-full bg-gradient-to-br from-amber-200 to-amber-500" />
          Shiny: <strong className="tabular-nums">{shinyCount}</strong>
        </span>
        <span className="text-muted-foreground">
          Prosto:{" "}
          <strong className="tabular-nums">
            {cardCount - entryCount - shinyCount}
          </strong>{" "}
          / {cardCount}
        </span>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        1× dotik = vstop/prodana · 2× = shiny · 3× = počisti
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(2.9rem,1fr))] gap-1.5">
        {Array.from({ length: cardCount }, (_, i) => i + 1).map((n) => {
          const mark: MarkState = optimisticMarks[n] ?? "none";
          return (
            <button
              key={n}
              type="button"
              onClick={() => handleTap(n)}
              aria-label={`Karta ${n}`}
              className={cn(
                "flex aspect-square touch-manipulation items-center justify-center rounded-md border text-sm font-medium tabular-nums transition-colors select-none active:scale-95",
                MARK_CLASS[mark],
              )}
            >
              {mark === "shiny" ? (
                <span className="flex flex-col items-center leading-none">
                  <span className="text-[0.6rem]">✦</span>
                  {n}
                </span>
              ) : (
                n
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
