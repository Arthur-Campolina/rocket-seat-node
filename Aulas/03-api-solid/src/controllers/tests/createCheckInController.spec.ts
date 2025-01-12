import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/createAndAuthenticateUser";

describe("Create a check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should create checkin", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gymResponse = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Star Gym",
        description: "Where you test your software's limit",
        phone: "55 31 9771-8752",
        latitude: -19.9018707,
        longitude: -44.0241802,
      });
    const { gym } = gymResponse.body;

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-in`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userLatitude: -19.9018707,
        userLongitude: -44.0241802,
      });
    expect(response.statusCode).toEqual(201);
  });
});
