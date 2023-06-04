import { InMemoryCheckInRepository } from "@/repositories/in-memory/inMemoryCheckInRepository";
import { describe, beforeEach, it, expect } from "vitest";
import { GetCheckInsByUser } from "../getCheckInsByUser";

let checkInRepository: InMemoryCheckInRepository;
let sut: GetCheckInsByUser;

describe("Get Checkins by User Service", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    sut = new GetCheckInsByUser(checkInRepository);
  });

  it("Should Get User CheckIns", async () => {
    const userId = "user-1";
    for (let i = 1; i <= 22; i++) {
      const data = {
        user_id: userId,
        gym_id: `gym-${i}`,
      };
      await checkInRepository.create(data);
    }
    const { checkIns } = await sut.execute({ userId, page: 2 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
