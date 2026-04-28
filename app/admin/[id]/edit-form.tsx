"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SubmissionStatus } from "@/lib/db/schema";
import { updateSubmissionAction } from "./actions";

const STATUS_LABEL: Record<SubmissionStatus, string> = {
  pending: "Nova",
  reviewed: "Pregledana",
  shortlisted: "Izbrana",
  rejected: "Zavrnjena",
};

export function EditForm({
  id,
  status,
  adminNotes,
}: {
  id: string;
  status: SubmissionStatus;
  adminNotes: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(formData) =>
        startTransition(async () => {
          try {
            await updateSubmissionAction(formData);
            toast.success("Shranjeno");
          } catch {
            toast.error("Napaka pri shranjevanju");
          }
        })
      }
      className="space-y-4 rounded-lg border border-border/40 bg-card/40 p-4 backdrop-blur-sm"
    >
      <input type="hidden" name="id" value={id} />

      <div className="space-y-2">
        <Label>Status</Label>
        <Select name="status" defaultValue={status}>
          <SelectTrigger>
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="adminNotes">Zapiski</Label>
        <Textarea
          id="adminNotes"
          name="adminNotes"
          rows={8}
          defaultValue={adminNotes}
        />
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Shranjujem…" : "Shrani"}
      </Button>
    </form>
  );
}
