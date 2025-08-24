import type { Context } from "hono";
import { insertVillagerSchema, updateVillagerSchema } from "./villagers.schema";
import * as villagersService from "./villagers.service"

export async function createVillagerHandler(c: Context) {
  const body = await c.req.json()
  const data = insertVillagerSchema.parse(body)

  // check if nik is exist
  const villager = await villagersService.getVillagerByNik(data.nik)

  if (villager.length) {
    return c.json({
      success: false,
      message: "NIK sudah digunakan"
    }, 400)
  }
  
  // save to database
  await villagersService.createVillager(data)

  return c.json({
    success: true,
    message: "Penduduk telah dibuah"
  }, 201)
}

export async function getVillagerListHandler(c: Context) {
  const query = c.req.query("query")

  const villagers = await villagersService.getVillagerList(query)

  if (!villagers.length) {
    return c.json({
      success: false,
      message: "Tidak ada penduduk yang ditemukan"
    }, 404)
  } 

  return c.json({
    success: true,
    message: "Penduduk ditemukan",
    data: villagers
  }, 200)
}

export async function getVillagerByIdHandler(c: Context) {
  const idStr = c.req.param("id")
  const id = parseInt(idStr)

  const villager = await villagersService.getVillagerById(id)

  if (!villager.length) {
    return c.json({
      success: false,
      message: "Penduduk tidak ditemukan"
    }, 404)
  }

  return c.json({
    success: true,
    message: "Penduduk ditemukan",
    data: villager
  }, 200)
}

export async function getVillagerByNikHandler(c: Context) {
  const nik = c.req.param("nik")

  const villager = await villagersService.getVillagerByNik(nik)

  if (!villager.length) {
    return c.json({
      success: false,
      message: "Penduduk tidak ditemukan"
    }, 404)
  }

  return c.json({
    success: true,
    message: "Penduduk ditemukan",
    data: villager
  }, 200)
}

export async function updateVillagerHandler(c: Context) {
  const body = await c.req.json()
  const data = updateVillagerSchema.parse(body)

  // check if nik is exist
  const villager = await villagersService.getVillagerByNik(data.nik!)

  if (villager.length) {
    return c.json({
      success: false,
      message: "NIK sudah digunakan"
    }, 400)
  }
  
  // save to database
  await villagersService.updateVillager(data.nik!, data)

  return c.json({
    success: true,
    message: "Penduduk telah dibuah"
  }, 201)
}

export async function deleteVillageByNikHander(c: Context) {
  const nik = c.req.param("nik")

  // check if villager is exist
  const villager = await villagersService.getVillagerByNik(nik)  

  if (!villager.length) {
    return c.json({
      success: true,
      message: "Penduduk tidak ditemukan"
    }, 404)
  }

  await villagersService.deleteVillagerByNik(nik)

  return c.json({
    success: true,
    message: "Penduduk dihapus"
  }, 200)
}
