"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { submissionSchema, type SubmissionInput } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MAX_PDF_BYTES = 100 * 1024 * 1024;

export function SubmissionForm() {
  const router = useRouter();
  const [pdf, setPdf] = useState<File | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<SubmissionInput>({
    resolver: zodResolver(submissionSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      artistName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      concept: "",
      links: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "links" });

  function handlePdfChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setPdfError(null);
    if (!file) {
      setPdf(null);
      return;
    }
    if (file.type !== "application/pdf") {
      setPdfError("Datoteka mora biti PDF");
      setPdf(null);
      return;
    }
    if (file.size > MAX_PDF_BYTES) {
      setPdfError("Datoteka presega 100 MB");
      setPdf(null);
      return;
    }
    setPdf(file);
  }

  async function onSubmit(data: SubmissionInput) {
    if (!pdf) {
      setPdfError("Priloži PDF");
      return;
    }

    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("artistName", data.artistName ?? "");
    formData.set("email", data.email);
    formData.set("phone", data.phone ?? "");
    formData.set("dateOfBirth", data.dateOfBirth);
    formData.set("concept", data.concept);
    for (const link of data.links) {
      if (link.url) formData.append("links", JSON.stringify(link));
    }
    formData.set("pdf", pdf);

    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/submit");
      xhr.upload.addEventListener("progress", (ev) => {
        if (ev.lengthComputable) {
          setUploadProgress(Math.round((ev.loaded / ev.total) * 100));
        }
      });
      xhr.addEventListener("load", () => {
        setUploadProgress(null);
        if (xhr.status >= 200 && xhr.status < 300) {
          startTransition(() => {
            router.push("/submit/success");
          });
          resolve();
        } else {
          let message = "Napaka pri pošiljanju";
          try {
            const body = JSON.parse(xhr.responseText);
            if (body?.error) message = body.error;
          } catch {}
          toast.error(message);
          reject(new Error(message));
        }
      });
      xhr.addEventListener("error", () => {
        setUploadProgress(null);
        toast.error("Napaka povezave");
        reject(new Error("network"));
      });
      xhr.send(formData);
    }).catch(() => {});
  }

  const uploading = uploadProgress !== null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Ime in priimek *</Label>
          <Input id="name" autoComplete="name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="artistName">Umetniško ime</Label>
          <Input
            id="artistName"
            placeholder="po želji"
            {...register("artistName")}
          />
          {errors.artistName && (
            <p className="text-sm text-destructive">
              {errors.artistName.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">E-pošta *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Datum rojstva *</Label>
        <Input
          id="dateOfBirth"
          type="date"
          autoComplete="bday"
          max={new Date().toISOString().slice(0, 10)}
          {...register("dateOfBirth")}
        />
        {errors.dateOfBirth && (
          <p className="text-sm text-destructive">
            {errors.dateOfBirth.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="concept">Opis koncepta *</Label>
        <Textarea
          id="concept"
          rows={6}
          placeholder="Na kratko opiši svoj koncept, navdih, tehniko…"
          {...register("concept")}
        />
        {errors.concept && (
          <p className="text-sm text-destructive">{errors.concept.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Povezave (portfolio, Instagram, itd.)</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ url: "", label: "" })}
            disabled={fields.length >= 10}
          >
            + Dodaj povezavo
          </Button>
        </div>
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Neobvezno. Lahko dodaš do 10 povezav.
          </p>
        )}
        {fields.map((field, i) => (
          <div key={field.id} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <Input
              placeholder="https://…"
              {...register(`links.${i}.url` as const)}
            />
            <Input
              placeholder="Oznaka (neobvezno)"
              {...register(`links.${i}.label` as const)}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(i)}
            >
              Odstrani
            </Button>
            {errors.links?.[i]?.url && (
              <p className="text-sm text-destructive sm:col-span-3">
                {errors.links[i]?.url?.message}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pdf">PDF prijava *</Label>
        <p className="text-sm text-muted-foreground">
          Naj vključuje skice (vsaj 3) in vision board / moodboard. Največ 100 MB.
        </p>
        <Input
          id="pdf"
          type="file"
          accept="application/pdf"
          onChange={handlePdfChange}
        />
        {pdf && (
          <p className="text-sm text-muted-foreground">
            {pdf.name} — {(pdf.size / 1024 / 1024).toFixed(1)} MB
          </p>
        )}
        {pdfError && <p className="text-sm text-destructive">{pdfError}</p>}
      </div>

      {uploading && (
        <div className="space-y-1">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-[width] duration-150"
              style={{ width: `${uploadProgress ?? 0}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Pošiljanje… {uploadProgress}%
          </p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!isValid || !pdf || uploading || isPending}
      >
        {uploading ? "Pošiljam…" : "Oddaj prijavo"}
      </Button>
    </form>
  );
}
