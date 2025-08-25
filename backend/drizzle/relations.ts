import { relations } from "drizzle-orm/relations";
import { penduduk, role } from "./schema";

export const pendudukRelations = relations(penduduk, ({one, many}) => ({
	penduduk: one(penduduk, {
		fields: [penduduk.parentId],
		references: [penduduk.id],
		relationName: "penduduk_parentId_penduduk_id"
	}),
	penduduks: many(penduduk, {
		relationName: "penduduk_parentId_penduduk_id"
	}),
	role: one(role, {
		fields: [penduduk.roleId],
		references: [role.id]
	}),
}));

export const roleRelations = relations(role, ({many}) => ({
	penduduks: many(penduduk),
}));