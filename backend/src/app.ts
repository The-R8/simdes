import { Hono } from "hono";
import pendudukRoutes from "./modules/penduduk/penduduk.routes";

const app = new Hono();

app.route("/api/penduduk", pendudukRoutes);
app.get("/", (c) => c.json({ message: "Welcome to Simdes API" }));

export default app;
