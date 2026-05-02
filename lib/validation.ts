import { z } from "zod";

export const submissionLinkSchema = z.object({
  url: z
    .string()
    .trim()
    .url({ message: "Neveljaven URL" })
    .max(2000, "URL je predolg"),
  label: z.string().trim().max(200).optional().or(z.literal("")),
});

export const submissionSchema = z.object({
  name: z.string().trim().min(1, "Ime je obvezno").max(200),
  email: z.string().trim().email("Neveljaven e-poštni naslov").max(320),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  dateOfBirth: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Neveljaven datum")
    .refine((v) => {
      const d = new Date(v);
      const min = new Date("1900-01-01");
      const max = new Date();
      return !Number.isNaN(d.getTime()) && d >= min && d <= max;
    }, "Neveljaven datum"),
  concept: z
    .string()
    .trim()
    .min(10, "Opis koncepta je prekratek")
    .max(5000, "Opis koncepta je predolg"),
  links: z.array(submissionLinkSchema).max(10, "Preveč povezav"),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;
export type SubmissionLinkInput = z.infer<typeof submissionLinkSchema>;

export const MAX_PDF_BYTES = 100 * 1024 * 1024;
