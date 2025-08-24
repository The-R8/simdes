import { pgTable, integer, varchar, timestamp, date, text, pgEnum } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod"

// table def
export const jkEnum = pgEnum("jk", ["L", "P"])

export const villagers = pgTable("villagers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nik: varchar({ length: 16 }).unique().notNull(),
  name: varchar({ length: 100 }).notNull(),
  alamat: text().notNull(),
  rt: integer().notNull(),
  rw: integer().notNull(),
  desa_id: integer().notNull(),
  jk: jkEnum(),
  tanggal_lahir: date().notNull(),
  agama_id: integer().notNull(),
  tempat_lahir: varchar(),

  // timestamp
  created_at: timestamp().defaultNow().notNull(),
  upadted_at: timestamp().defaultNow().$onUpdate(() => new Date()).notNull(),
})

// zod scheme
export const insertVillagerSchema = createInsertSchema(villagers)
export const updateVillagerSchema = createUpdateSchema(villagers)
export const selectVillagerSchema = createSelectSchema(villagers)

// type helper
export type InsertVillager = typeof villagers.$inferInsert
export type UpdateVillager = Partial<InsertVillager>
export type SelectVIllager = typeof villagers.$inferSelect
