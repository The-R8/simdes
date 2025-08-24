import { relations } from "drizzle-orm"
import { pgTable, integer, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod"
import { dusun } from "../dusun/dusun.schema"

export const kartuKeluarga = pgTable("kartu_keluarga", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nomor_kk: integer().unique().notNull(),
  rt: integer().notNull(),
  rw: integer().notNull(),
  dusun_id: integer().notNull(),
  penduduk_id: integer().notNull(),

  // timestamp
  created_at: timestamp().defaultNow().notNull(),
  upadted_at: timestamp().defaultNow().$onUpdate(() => new Date()).notNull(),
})

// relations
export const kartuKeluargaRelations = relations(kartuKeluarga, ({one}) => ({
  dusun: one(dusun, {
    fields: [kartuKeluarga.dusun_id],
    references: [dusun.id]
  })
}))

// zod scheme
export const insertKartuKeluargaSchema = createInsertSchema(kartuKeluarga)
export const updateKartuKeluargaSchema = createUpdateSchema(kartuKeluarga)
export const selectKartuKeluargaSchema = createSelectSchema(kartuKeluarga)

// type helper
export type InsertKartuKeluarga = typeof kartuKeluarga.$inferInsert
export type UpdateKartuKeluarga = Partial<InsertKartuKeluarga>
export type SelectKartuKeluarga = typeof kartuKeluarga.$inferSelect
