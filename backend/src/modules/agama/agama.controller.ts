import type { Context } from "hono";
import {
  insertAgamaSchema,
  updateAgamaSchema,
} from "../penduduk/penduduk.schema";
import * as agamaService from "./agama.service";

export async function createAgamaListHandler(c: Context) {
  const body = await c.req.json();
  const data = insertAgamaSchema.parse(body);

  const existingAgama = await agamaService.getAgamaByName(data.nama);

  if (existingAgama) {
    return c.json(
      {
        success: false,
        message: "Agama sudah ada",
      },
      400,
    );
  }

  const agama = await agamaService.createAgama(data);

  return c.json(
    {
      success: true,
      message: "Agama telah ditambahkan",
      data: agama,
    },
    201,
  );
}

export async function getAgamaListHandler(c: Context) {
  const agama = await agamaService.getAgamaList();

  if (!agama.length) {
    return c.json(
      {
        success: false,
        message: "Tidak ada agama yang ditemukan",
      },
      404,
    );
  }

  return c.json(
    {
      success: true,
      message: "Agama ditemukan",
      data: agama,
    },
    200,
  );
}

export async function getAgamaByIdHandler(c: Context) {
  const idStr = c.req.param("id");
  const id = parseInt(idStr);

  const agama = await agamaService.getAgamaById(id);

  if (!agama) {
    return c.json(
      {
        success: false,
        message: "Agama tidak ditemukan",
      },
      404,
    );
  }

  return c.json(
    {
      success: true,
      message: "Agama ditemukan",
      data: agama,
    },
    200,
  );
}

export async function updateAgamaHandler(c: Context) {
  const body = await c.req.json();
  const data = updateAgamaSchema.parse(body);
}
