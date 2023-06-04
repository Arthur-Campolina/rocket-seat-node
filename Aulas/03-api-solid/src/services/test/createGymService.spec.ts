import { InMemoryGymRepository } from "@/repositories/in-memory/inMemoryGymRepository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymService } from "../createGymService";

let gymRepository: InMemoryGymRepository;
let sut: CreateGymService;

describe("Create Gym Service Test", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    sut = new CreateGymService(gymRepository);
  });

  it("Should create a gym", async () => {
    const { gym } = await sut.execute({
      title: "JavaScrypt Gym",
      description: "",
      phone: "",
      latitude: 0,
      longitude: 0,
    });
    expect(gym.id).toEqual(expect.any(String));
  });
});
