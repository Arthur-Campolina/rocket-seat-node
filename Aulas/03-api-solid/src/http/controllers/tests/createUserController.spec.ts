import { it, describe, expect, afterAll, beforeAll } from "vitest";
import { app } from "@/app";
import request from "supertest";

describe("Create User Controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should create a new user", async () => {
    const response = await request(app.server).post("/users").send({
      name: "Jhon Doe Test",
      email: "jhondoe@test.com.br",
      password: "abc123456",
    });
    expect(response.statusCode).toEqual(201);
  });
});
