import { Hono } from "hono"
import { createVillagerHandler, deleteVillageByNikHander, getVillagerByIdHandler, getVillagerByNikHandler, getVillagerListHandler, updateVillagerHandler } from "./villagers.controller"

const villagersRoutes = new Hono()

villagersRoutes.post("/", createVillagerHandler)
villagersRoutes.get("/", getVillagerListHandler)
villagersRoutes.get("/:id", getVillagerByIdHandler)
villagersRoutes.get("/:nik", getVillagerByNikHandler)
villagersRoutes.put("/:nik", updateVillagerHandler)
villagersRoutes.delete("/:nik", deleteVillageByNikHander)

export default villagersRoutes
