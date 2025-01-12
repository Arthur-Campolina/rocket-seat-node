import { app } from "./app.js";
import { env } from "./env/index.js";
import { routes } from "./routes/routes.js";
import { genericErrorHandler } from "./utils/genericErrorHandler.js";

routes(app)

genericErrorHandler(app)

app
  .listen({
    host: "0.0.0.0", // evita problemas de conexão com aplicações frontend
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP server running on port ${env.PORT}!`);
  });
