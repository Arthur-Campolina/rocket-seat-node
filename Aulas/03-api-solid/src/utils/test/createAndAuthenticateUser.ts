import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "Jhon Doe",
    email: "jhondoe@test.com",
    password: "abc123456",
  });
  const authResponse = await request(app.server).post("/sessions").send({
    email: "jhondoe@test.com",
    password: "abc123456",
  });
  const { token } = authResponse.body;
  return { token };
}
