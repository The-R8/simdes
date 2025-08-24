import { eq, or } from "drizzle-orm";
import { db } from "../../config/db";
import {
  penduduk,
  type InsertPenduduk,
  type UpdatePenduduk,
} from "./penduduk.schema";

export async function createPenduduk(data: InsertPenduduk) {
  return db.insert(penduduk).values(data);
}

export async function getPendudukList(query?: string) {
  if (query != "") {
    return db
      .select()
      .from(penduduk)
      .where(or(eq(penduduk.nama, query!), eq(penduduk.nik, query!)));
  }

  return db.select().from(penduduk);
}

export async function getPendudukById(id: number) {
  return db.select().from(penduduk).where(eq(penduduk.id, id));
}

export async function getPendudukByNik(nik: string) {
  return db.select().from(penduduk).where(eq(penduduk.nik, nik));
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
