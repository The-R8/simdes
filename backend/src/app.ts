import { Hono } from "hono"
import villagersRoutes from "./modules/villagers/villagers.routes"

const app = new Hono()

app.route("/api/villagers", villagersRoutes)

export default app
