import { relations } from "drizzle-orm"
import { pgTable, integer, varchar, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod"
import { kartuKeluarga } from "../kartu_keluarga/kartu_keluarga.schema"

export const dusun = pgTable("dusun", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar().notNull(),
  
  // timestamp
  created_at: timestamp().defaultNow().notNull(),
  upadted_at: timestamp().defaultNow().$onUpdate(() => new Date()).notNull(),
})

// relations
export const dusunRelations = relations(dusun, ({ many }) => ({
  kartuKeluarga: many(kartuKeluarga)
}))

// zod scheme
export const insertDusunSchema = createInsertSchema(dusun)
export const updateDusunSchema = createUpdateSchema(dusun)
export const selectDusunSchema = createSelectSchema(dusun)

// type helper
export type InsertDusun = typeof dusun.$inferInsert
export type UpdateDusun = Partial<InsertDusun>
export type SelectDusun = typeof dusun.$inferSelect
