"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SubmissionStatus } from "@/lib/db/schema";
import { updateStatusAction } from "@/app/admin/list-actions";

const STATUS_LABEL: Record<SubmissionStatus, string> = {
  pending: "Nova",
  reviewed: "Pregledana",
  shortlisted: "Izbrana",
  rejected: "Zavrnjena",
};

export function InlineStatusSelect({
  id,
  status,
}: {
  id: string;
  status: SubmissionStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Select
      defaultValue={status}
      disabled={pending}
      onValueChange={(value) => {
        const next = value as SubmissionStatus;
        if (next === status) return;
        startTransition(async () => {
          const fd = new FormData();
          fd.set("id", id);
          fd.set("status", next);
          try {
            await updateStatusAction(fd);
            toast.success(`Status: ${STATUS_LABEL[next]}`);
          } catch {
            toast.error("Napaka pri shranjevanju");
          }
        });
      }}
    >
      <SelectTrigger size="sm" className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(STATUS_LABEL) as SubmissionStatus[]).map((s) => (
          <SelectItem key={s} value={s}>
            {STATUS_LABEL[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
