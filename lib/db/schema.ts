import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  date,
  bigint,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

export const submissionStatusEnum = pgEnum("submission_status", [
  "pending",
  "reviewed",
  "shortlisted",
  "rejected",
]);

export const submissions = pgTable(
  "submissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    name: varchar("name", { length: 200 }).notNull(),
    artistName: varchar("artist_name", { length: 200 }),
    email: varchar("email", { length: 320 }).notNull(),
    phone: varchar("phone", { length: 50 }),
    dateOfBirth: date("date_of_birth"),
    concept: text("concept").notNull(),
    status: submissionStatusEnum("status").notNull().default("pending"),
    adminNotes: text("admin_notes"),
  },
  (t) => [
    index("submissions_created_at_idx").on(t.createdAt),
    index("submissions_status_idx").on(t.status),
  ],
);

export const submissionLinks = pgTable(
  "submission_links",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    submissionId: uuid("submission_id")
      .notNull()
      .references(() => submissions.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    label: varchar("label", { length: 200 }),
  },
  (t) => [index("submission_links_submission_idx").on(t.submissionId)],
);

export const submissionFiles = pgTable(
  "submission_files",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    submissionId: uuid("submission_id")
      .notNull()
      .references(() => submissions.id, { onDelete: "cascade" }),
    originalName: varchar("original_name", { length: 500 }).notNull(),
    size: bigint("size", { mode: "number" }).notNull(),
    storagePath: text("storage_path").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("submission_files_submission_idx").on(t.submissionId)],
);

export type Submission = typeof submissions.$inferSelect;
export type SubmissionLink = typeof submissionLinks.$inferSelect;
export type SubmissionFile = typeof submissionFiles.$inferSelect;
export type SubmissionStatus = Submission["status"];
