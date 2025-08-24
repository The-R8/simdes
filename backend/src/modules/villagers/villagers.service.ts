import { eq, or } from "drizzle-orm";
import { db } from "../../config/db"
import { villagers, type InsertVillager, type UpdateVillager } from "./villagers.schema";

export async function createVillager(data: InsertVillager) {
  return db.insert(villagers).values(data)
}

export async function getVillagerList(query?: string) {
  if (query != "") {
    return db.select().from(villagers).where(or(eq(villagers.name, query!), eq(villagers.nik, query!)))
  }

  return db.select().from(villagers)
}

export async function getVillagerById(id: number) {
  return db.select().from(villagers).where(eq(villagers.id, id))
}

export async function getVillagerByNik(nik: string) {
  return db.select().from(villagers).where(eq(villagers.nik, nik))
}

export async function updateVillager(nik: string, data: UpdateVillager) {
  return db.update(villagers).set({
    nik: data.nik,
    name: data.nik,
    alamat: data.alamat,
    rt: data.rt,
    rw: data.rw,
    desa_id: data.desa_id,
    jk: data.jk,
    tanggal_lahir: data.tanggal_lahir,
    tempat_lahir: data.tempat_lahir,
    agama_id: data.agama_id,
  }).where(eq(villagers.nik, nik))
}

export async function deleteVillagerByNik(nik: string) {
  return db.delete(villagers).where(eq(villagers.nik, nik))
}
