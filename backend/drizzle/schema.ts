import { pgTable, integer, varchar, timestamp, unique, foreignKey, date, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const golonganDarah = pgEnum("golongan_darah", ['A', 'B', 'AB', 'O'])
export const jenisKelamin = pgEnum("jenis_kelamin", ['L', 'P'])
export const kewarganegaraan = pgEnum("kewarganegaraan", ['WNI', 'WNA'])
export const pendidikan = pgEnum("pendidikan", ['SD/SEDERAJAT', 'SLTP/SEDERAJAT', 'SLTA/SEDERAJAT', 'DIPLOMA 1', 'DIPLOMA 2', 'STRATA 1', 'STRATA 2'])
export const statusKawin = pgEnum("status_kawin", ['KAWIN', 'CERAI', 'KAWIN TERCATAT', 'CERAI MATI'])


export const agama = pgTable("agama", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "agama_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	nama: varchar({ length: 100 }).notNull(),
});

export const dusun = pgTable("dusun", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "dusun_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	upadtedAt: timestamp("upadted_at", { mode: 'string' }).defaultNow().notNull(),
});

export const kartuKeluarga = pgTable("kartu_keluarga", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "kartu_keluarga_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	nomorKk: integer("nomor_kk").notNull(),
	rt: integer().notNull(),
	rw: integer().notNull(),
	dusunId: integer("dusun_id").notNull(),
	pendudukId: integer("penduduk_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	upadtedAt: timestamp("upadted_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("kartu_keluarga_nomor_kk_unique").on(table.nomorKk),
]);

export const penduduk = pgTable("penduduk", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "penduduk_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	parentId: integer("parent_id"),
	nama: varchar({ length: 100 }).notNull(),
	nik: varchar({ length: 16 }).notNull(),
	tempatLahir: varchar("tempat_lahir", { length: 100 }),
	tanggalLahir: date("tanggal_lahir").notNull(),
	jenisKelamin: jenisKelamin("jenis_kelamin").notNull(),
	golonganDarah: golonganDarah("golongan_darah").notNull(),
	pekerjaan: varchar({ length: 100 }).notNull(),
	agamaId: integer("agama_id").notNull(),
	roleId: integer("role_id"),
	statusKawin: statusKawin("status_kawin").notNull(),
	pendidikan: pendidikan().notNull(),
	kewarganegaraan: kewarganegaraan().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "penduduk_parent_id_penduduk_id_fk"
		}),
	foreignKey({
			columns: [table.roleId],
			foreignColumns: [role.id],
			name: "penduduk_role_id_role_id_fk"
		}),
	unique("penduduk_nik_unique").on(table.nik),
]);

export const role = pgTable("role", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "role_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 100 }).notNull(),
});
