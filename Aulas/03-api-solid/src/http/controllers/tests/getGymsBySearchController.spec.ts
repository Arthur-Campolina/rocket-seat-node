import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/createAndAuthenticateUser";

describe("Get gym through search (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should find a gym through search", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "123 Gym",
        description: "Where you test your software's limit",
        phone: "55 31 9771-8752",
        latitude: -19.9018707,
        longitude: -44.0241802,
      });
    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "456 Gym",
        description: "code like a pro",
        phone: "55 31 9771-8798",
        latitude: -19.9018707,
        longitude: -44.0241802,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "456 Gym",
        page: 1,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: "456 Gym" }),
    ]);
  });
});
