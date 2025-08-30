import { serve } from "@hono/node-server";
import app from "./app";

serve(
  {
    fetch: app.fetch,
    port: process.env.PORT as unknown as number,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
