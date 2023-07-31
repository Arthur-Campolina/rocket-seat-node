import { it, describe, expect, afterAll, beforeAll } from "vitest";
import { app } from "@/app";
import request from "supertest";

describe("Refresh Token Controller Test", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should refresh token", async () => {
    await request(app.server).post("/users").send({
      name: "Jhon Doe",
      email: "jhondoe@test.com",
      password: "abc123456",
    });
    const authResponse = await request(app.server).post("/sessions").send({
      email: "jhondoe@test.com",
      password: "abc123456",
    });
    const cookies = authResponse.get("Set-Cookie");
    const response = await request(app.server)
      .patch("/refresh/token")
      .set("Cookie", cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
