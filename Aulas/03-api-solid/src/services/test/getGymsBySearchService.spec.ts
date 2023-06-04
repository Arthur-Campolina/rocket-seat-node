import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryGymRepository } from "@/repositories/in-memory/inMemoryGymRepository";
import { GetGymBySearch } from "../getGymsBySearchService";

let gymRepository: InMemoryGymRepository;
let sut: GetGymBySearch;

describe("Get Gyms by search", () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository();
    sut = new GetGymBySearch(gymRepository);
    const gyms = [];
    for (let i = 1; i <= 22; i++) {
      const data = {
        title: `JSGym-${i}`,
        latitude: 0,
        longitude: 0,
      };
      gyms.push(data);
    }
    for (const gym of gyms) {
      await gymRepository.create(gym);
    }
  });

  it("Should Get Gyms by Search", async () => {
    const { gyms } = await sut.execute({ query: "JSGym-22", page: 2 });
    console.log(JSON.stringify(gyms));
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "JSGym-22" })]);
  });
});
