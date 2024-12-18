import fastify from "fastify";
import { transactionRoutes } from "./routes/transactions";
import { userRoutes } from "./routes/users";
import cookie from "@fastify/cookie";

export const app = fastify();
app.register(cookie); // antes de tudo
app.register(transactionRoutes, {
  prefix: "transactions",
});
app.register(userRoutes, {
  prefix: "users",
});
