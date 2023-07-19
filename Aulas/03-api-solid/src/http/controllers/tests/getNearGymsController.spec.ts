import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/createAndAuthenticateUser";

describe("Get near gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should find near gyms", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "FAR Gym",
        description: "Where you test your software's limit",
        phone: "55 31 9771-8752",
        latitude: -19.9762062,
        longitude: -43.9495572,
      });
    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "NEAR Gym",
        description: "Where you test your software's limit",
        phone: "55 31 9771-8752",
        latitude: -19.8584208,
        longitude: -43.9589116,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        userLatitude: -19.8584208,
        userLongitude: -43.9589116,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "NEAR Gym",
      }),
    ]);
  });
});
