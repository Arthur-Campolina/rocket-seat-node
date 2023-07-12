import { it, describe, expect, afterAll, beforeAll } from "vitest";
import { app } from "@/app";
import request from "supertest";

describe("Get Profile Controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should get a profile", async () => {
    await request(app.server).post("/users").send({
      name: "Jhon Doe",
      email: "jhondoe@test.com",
      password: "abc123456",
    });
    const authResponse = await request(app.server).post("/sessions").send({
      email: "jhondoe@test.com",
      password: "abc123456",
    });
    const { body } = authResponse;
    const response = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${body.token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: "jhondoe@test.com",
      })
    );
  });
});
