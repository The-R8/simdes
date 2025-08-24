import { Hono } from "hono";
import {
  createPendudukHandler,
  deletePendudukByNikHandler,
  getPendudukByIdHandler,
  getPendudukByNikHandler,
  getPendudukListHandler,
  updatePendudukHandler,
} from "./penduduk.controller";

const pendudukRoutes = new Hono();

pendudukRoutes.post("/", createPendudukHandler);
pendudukRoutes.get("/", getPendudukListHandler);
pendudukRoutes.get("/:id", getPendudukByIdHandler);
pendudukRoutes.get("/:nik", getPendudukByNikHandler);
pendudukRoutes.put("/:nik", updatePendudukHandler);
pendudukRoutes.delete("/:nik", deletePendudukByNikHandler);

export default pendudukRoutes;
