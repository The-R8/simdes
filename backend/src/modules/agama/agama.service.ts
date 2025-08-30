import { eq } from "drizzle-orm";
import { db } from "../../config/db";
import type { InsertAgama, UpdateAgama } from "../penduduk/penduduk.schema";
import { agama } from "../schema";

// AGAMA MANAGEMENT
export async function createAgama(data: InsertAgama) {
  return db.insert(agama).values(data);
}

export async function getAgamaList() {
  return db.query.agama.findMany({
    orderBy: agama.nama,
  });
}

export async function getAgamaById(id: number) {
  return db.query.agama.findFirst({
    where: eq(agama.id, id),
  });
}

export async function getAgamaByName(name: string) {
  return db.query.agama.findFirst({
    where: eq(agama.nama, name),
  });
}

export async function updateAgama(id: number, data: UpdateAgama) {
  return db.update(agama).set(data).where(eq(agama.id, id));
}

export async function deleteAgamaById(id: number) {
  return db.delete(agama).where(eq(agama.id, id));
}
