import { eq, or } from "drizzle-orm";
import { db } from "../../config/db";
import {
  agama,
  penduduk,
  role,
  type InsertAgama,
  type InsertPenduduk,
  type UpdateAgama,
  type UpdatePenduduk,
} from "./penduduk.schema";

export async function createPenduduk(data: InsertPenduduk) {
  return db.insert(penduduk).values(data);
}

export async function getPendudukList(query?: string) {
  if (query != "") {
    return db.query.penduduk.findMany({
      where: or(eq(penduduk.nama, query!), eq(penduduk.nik, query!)),
      orderBy: penduduk.nama,
    });
  }

  return db.query.penduduk.findMany({
    orderBy: penduduk.nama,
  });
}

export async function getPendudukById(id: number) {
  return db.query.penduduk.findFirst({
    where: eq(penduduk.id, id),
  });
}

export async function getPendudukByNik(nik: string) {
  return db.query.penduduk.findFirst({
    where: eq(penduduk.nik, nik),
  });
}

export async function updatePenduduk(nik: string, data: UpdatePenduduk) {
  return db
    .update(penduduk)
    .set({
      nik: data.nik,
      nama: data.nama,
      tempat_lahir: data.tempat_lahir,
      tanggal_lahir: data.tanggal_lahir,
      jenis_kelamin: data.jenis_kelamin,
      golongan_darah: data.golongan_darah,
      pekerjaan: data.pekerjaan,
      agama_id: data.agama_id,
      status_kawin: data.status_kawin,
      pendidikan: data.pendidikan,
      kewarganegaraan: data.kewarganegaraan,
    })
    .where(eq(penduduk.nik, nik));
}

export async function deletePendudukByNik(nik: string) {
  return db.delete(penduduk).where(eq(penduduk.nik, nik));
}

// ROLE MANAGEMENT
export async function createRole(name: string) {
  return db.insert(role).values({ nama: name });
}

export async function getRoleList() {
  return db.query.role.findMany({
    orderBy: role.nama,
  });
}

export async function getRoleById(id: number) {
  return db.query.role.findFirst({
    where: eq(role.id, id),
  });
}

export async function getRoleByName(name: string) {
  return db.query.role.findFirst({
    where: eq(role.nama, name),
  });
}

export async function updateRole(id: number, name: string) {
  return db.update(role).set({ nama: name }).where(eq(role.id, id));
}

export async function deleteRoleById(id: number) {
  return db.delete(role).where(eq(role.id, id));
}
