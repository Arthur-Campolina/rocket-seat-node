import fastify from "fastify";
import { userController } from "./controllers/userController";

export const app = fastify();

app.register(userController, {
  prefix: "/users",
});
