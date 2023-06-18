import { InMemoryCheckInRepository } from "@/repositories/in-memory/inMemoryCheckInRepository";
import { describe, expect, it, beforeEach } from "vitest";
import { ValidateCheckInService } from "../validateCheckInService";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let checkInRepository: InMemoryCheckInRepository;
let sut: ValidateCheckInService;

describe("Validate Check-in Service Test", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    sut = new ValidateCheckInService(checkInRepository);
  });

  it("Should validate a check-in", async () => {
    const data = {
      user_id: "user-1",
      gym_id: "gym-1",
    };
    const newCheckIn = await checkInRepository.create(data);
    const { checkIn } = await sut.execute({
      checkInId: newCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInRepository.checkIns[0].validated_at).toEqual(
      expect.any(Date)
    );
  });
  it("Should not validate a check-in that dosen't exist", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "inexistent-check-in-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
