import type { Context } from "hono";
import { insertPendudukSchema, updatePendudukSchema } from "./penduduk.schema";
import * as pendudukService from "./penduduk.service";

export async function createPendudukHandler(c: Context) {
  const body = await c.req.json();
  const data = insertPendudukSchema.parse(body);

  // check if nik is exist
  const penduduk = await pendudukService.getPendudukByNik(data.nik);

  if (penduduk) {
    return c.json(
      {
        success: false,
        message: "NIK sudah digunakan",
      },
      400,
    );
  }

  // save to database
  await pendudukService.createPenduduk(data);

  return c.json(
    {
      success: true,
      message: "Penduduk telah dibuah",
    },
    201,
  );
}

export async function getPendudukListHandler(c: Context) {
  const query = c.req.query("query");

  const penduduk = await pendudukService.getPendudukList(query);

  if (penduduk) {
    return c.json(
      {
        success: false,
        message: "Tidak ada penduduk yang ditemukan",
      },
      404,
    );
  }

  return c.json(
    {
      success: true,
      message: "Penduduk ditemukan",
      data: penduduk,
    },
    200,
  );
}

export async function getPendudukByIdHandler(c: Context) {
  const idStr = c.req.param("id");
  const id = parseInt(idStr);

  const penduduk = await pendudukService.getPendudukById(id);

  if (penduduk) {
    return c.json(
      {
        success: false,
        message: "Penduduk tidak ditemukan",
      },
      404,
    );
  }

  return c.json(
    {
      success: true,
      message: "Penduduk ditemukan",
      data: penduduk,
    },
    200,
  );
}

export async function getPendudukByNikHandler(c: Context) {
  const nik = c.req.param("nik");

  const penduduk = await pendudukService.getPendudukByNik(nik);

  if (penduduk) {
    return c.json(
      {
        success: false,
        message: "Penduduk tidak ditemukan",
      },
      404,
    );
  }

  return c.json(
    {
      success: true,
      message: "Penduduk ditemukan",
      data: penduduk,
    },
    200,
  );
}

export async function updatePendudukHandler(c: Context) {
  const body = await c.req.json();
  const data = updatePendudukSchema.parse(body);

  // check if nik is exist
  const penduduk = await pendudukService.getPendudukByNik(data.nik!);

  if (penduduk) {
    return c.json(
      {
        success: false,
        message: "NIK sudah digunakan",
      },
      400,
    );
  }

  // save to database
  await pendudukService.updatePenduduk(data.nik!, data);

  return c.json(
    {
      success: true,
      message: "Penduduk telah dibuah",
    },
    201,
  );
}

export async function deletePendudukByNikHandler(c: Context) {
  const nik = c.req.param("nik");

  // check if villager is exist
  const penduduk = await pendudukService.getPendudukByNik(nik);

  if (penduduk) {
    return c.json(
      {
        success: true,
        message: "Penduduk tidak ditemukan",
      },
      404,
    );
  }

  await pendudukService.deletePendudukByNik(nik);

  return c.json(
    {
      success: true,
      message: "Penduduk dihapus",
    },
    200,
  );
}
