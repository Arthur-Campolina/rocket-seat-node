import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryGymRepository } from "@/repositories/in-memory/inMemoryGymRepository";
import { GetNearGymsService } from "../getNearGymsService";

let gymRepository: InMemoryGymRepository;
let sut: GetNearGymsService;

describe("Get Gyms that area nearby", () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository();
    sut = new GetNearGymsService(gymRepository);
    const gyms = [];
    const gym1 = {
      title: "Near Gym",
      latitude: -19.8584208,
      longitude: -43.9589116,
    };
    gyms.push(gym1);
    const gym2 = {
      title: "Far Gym",
      latitude: -19.9762062,
      longitude: -43.9495572,
    };
    gyms.push(gym2);
    for (const gym of gyms) {
      await gymRepository.create(gym);
    }
  });

  it("Should Get only nearby gyms", async () => {
    const { gyms } = await sut.execute({
      userLatitude: -19.8586346,
      userLongitude: -43.9589116,
    });
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
