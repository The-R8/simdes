import { Hono } from "hono";
import pendudukRoutes from "./modules/penduduk/penduduk.routes";

const app = new Hono();

app.route("/api/penduduk", pendudukRoutes);

export default app;
