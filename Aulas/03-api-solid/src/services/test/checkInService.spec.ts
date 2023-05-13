import { InMemoryCheckInRepository } from "@/repositories/in-memory/inMemoryCheckInRepository";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { CheckInService } from "../checkInService";
import { randomUUID } from "node:crypto";

let checkInRepository: InMemoryCheckInRepository;
let sut: CheckInService;

describe("Check-in Service Test", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository();
    sut = new CheckInService(checkInRepository);

    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should check in at a gym", async () => {
    const { checkIn } = await sut.execute({
      userId: randomUUID(),
      gymId: randomUUID(),
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Shouldn't check in more than once a day", async () => {
    const userId = randomUUID();
    const gymId = randomUUID();

    vi.setSystemTime(new Date(2022, 1, 1, 11, 0));
    await sut.execute({
      userId,
      gymId,
    });

    await expect(() =>
      sut.execute({
        userId,
        gymId,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("Should check in more than once if it is on a different day", async () => {
    const userId = randomUUID();
    const gymId = randomUUID();

    vi.setSystemTime(new Date(2022, 1, 1, 11, 0));
    await sut.execute({
      userId,
      gymId,
    });

    vi.setSystemTime(new Date(2022, 1, 2, 11, 0));
    const { checkIn } = await sut.execute({
      userId,
      gymId,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
});
