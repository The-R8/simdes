import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  varchar,
  timestamp,
  date,
  text,
  pgEnum,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

// table def
export const jkEnum = pgEnum("jenis_kelamin", ["L", "P"]);
export const golonganDarahEnum = pgEnum("golongan_darah", [
  "A",
  "B",
  "AB",
  "O",
]);

export const statusKawinEnum = pgEnum("status_kawin", [
  "KAWIN",
  "CERAI",
  "KAWIN TERCATAT",
  "CERAI MATI",
]);

export const pendidikanEnum = pgEnum("pendidikan", [
  "SD/SEDERAJAT",
  "SLTP/SEDERAJAT",
  "SLTA/SEDERAJAT",
  "DIPLOMA 1",
  "DIPLOMA 2",
  "STRATA 1",
  "STRATA 2",
]);

export const kewarganegaraanEnum = pgEnum("kewarganegaraan", ["WNI", "WNA"]);

export const agama = pgTable("agama", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nama: varchar({ length: 100 }).notNull(),
});

export const role = pgTable("role", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).notNull(),
});

export const penduduk = pgTable("penduduk", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  parent_id: integer().references((): AnyPgColumn => penduduk.id),
  nama: varchar({ length: 100 }).notNull(),
  nik: varchar({ length: 16 }).unique().notNull(),
  tempat_lahir: varchar({ length: 100 }),
  tanggal_lahir: date().notNull(),

  jenis_kelamin: jkEnum().notNull(),
  golongan_darah: golonganDarahEnum().notNull(),

  pekerjaan: varchar({ length: 100 }).notNull(),
  agama_id: integer().notNull(),
  role_id: integer().references((): AnyPgColumn => role.id),

  status_kawin: statusKawinEnum().notNull(),
  pendidikan: pendidikanEnum().notNull(),
  kewarganegaraan: kewarganegaraanEnum().notNull(),

  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const pendudukRelations = relations(penduduk, ({ one }) => ({
  agama: one(agama, {
    fields: [penduduk.agama_id],
    references: [agama.id],
  }),
  role: one(role, {
    fields: [penduduk.role_id],
    references: [role.id],
  }),
}));

// zod scheme
export const insertPendudukSchema = createInsertSchema(penduduk);
export const updatePendudukSchema = createUpdateSchema(penduduk);
export const selectPendudukSchema = createSelectSchema(penduduk);

// type helper
export type InsertPenduduk = typeof penduduk.$inferInsert;
export type UpdatePenduduk = Partial<InsertPenduduk>;
export type SelectPenduduk = typeof penduduk.$inferSelect;
