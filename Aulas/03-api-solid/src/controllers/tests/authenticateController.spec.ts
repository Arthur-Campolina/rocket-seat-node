import { it, describe, expect, afterAll, beforeAll } from "vitest";
import { app } from "@/app";
import request from "supertest";

describe("Authenticate Controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should authenticate", async () => {
    await request(app.server).post("/users").send({
      name: "Jhon Doe",
      email: "jhondoe@test.com",
      password: "abc123456",
    });
    const response = await request(app.server).post("/sessions").send({
      email: "jhondoe@test.com",
      password: "abc123456",
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
