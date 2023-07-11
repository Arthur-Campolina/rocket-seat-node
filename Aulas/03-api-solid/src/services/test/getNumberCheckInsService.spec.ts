import { InMemoryCheckInRepository } from "@/repositories/in-memory/inMemoryCheckInRepository";
import { describe, beforeEach, it, expect } from "vitest";
import { GetNumberCheckInsService } from "../getNumberCheckInsService";

let checkInRepository: InMemoryCheckInRepository;
let sut: GetNumberCheckInsService;

describe("Get Number of Checkins by User Service", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    sut = new GetNumberCheckInsService(checkInRepository);
  });

  it("Should Get Number of CheckIns by User", async () => {
    const userId = "user-1";
    for (let i = 1; i <= 3; i++) {
      const data = {
        user_id: userId,
        gym_id: `gym-${i}`,
      };
      await checkInRepository.create(data);
    }
    const checkIns = await sut.execute(userId);

    expect(checkIns).toEqual(3);
  });
});
