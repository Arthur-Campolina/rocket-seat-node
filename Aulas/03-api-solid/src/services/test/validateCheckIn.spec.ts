import { InMemoryCheckInRepository } from "@/repositories/in-memory/inMemoryCheckInRepository";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { ValidateCheckInService } from "../validateCheckInService";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { CheckInValidationTimeExpired } from "../errors/check-in-validation-time-expired";

let checkInRepository: InMemoryCheckInRepository;
let sut: ValidateCheckInService;

describe("Validate Check-in Service Test", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    sut = new ValidateCheckInService(checkInRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it("Shouldn't validate a check-in that dosen't exist", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "inexistent-check-in-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("Shouldn't validate a check-in after 20 minutes of its creations", async () => {
    // creates check-in
    vi.setSystemTime(new Date(2023, 0, 1, 12, 0));
    const data = {
      user_id: "user-1",
      gym_id: "gym-1",
    };
    const newCheckIn = await checkInRepository.create(data);

    // tries to validate check-in
    const twentyOneMinutes = 1000 * 60 * 21;
    vi.advanceTimersByTime(twentyOneMinutes);
    await expect(() =>
      sut.execute({
        checkInId: newCheckIn.id,
      })
    ).rejects.toBeInstanceOf(CheckInValidationTimeExpired);
  });

  it("Should validate a check-in before 20 minutes of its creations", async () => {
    // creates check-in
    vi.setSystemTime(new Date(2023, 0, 1, 12, 0));
    const data = {
      user_id: "user-1",
      gym_id: "gym-1",
    };
    const newCheckIn = await checkInRepository.create(data);

    // validates check-in
    const nineteenMinutes = 1000 * 60 * 19;
    vi.advanceTimersByTime(nineteenMinutes);
    const { checkIn } = await sut.execute({
      checkInId: newCheckIn.id,
    });
    expect(checkIn.id).toBe(newCheckIn.id);
    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
