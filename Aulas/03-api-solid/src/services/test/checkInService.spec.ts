import { InMemoryCheckInRepository } from "@/repositories/in-memory/inMemoryCheckInRepository";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { CheckInService } from "../checkInService";
import { randomUUID } from "node:crypto";
import { InMemoryGymRepository } from "@/repositories/in-memory/inMemoryGymRepository";

let checkInRepository: InMemoryCheckInRepository;
let gymRepository: InMemoryGymRepository;
let sut: CheckInService;

describe("Check-in Service Test", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository();
    gymRepository = new InMemoryGymRepository();
    sut = new CheckInService(checkInRepository, gymRepository);

    gymRepository.create({
      id: "gym-1",
      title: "JavaScrypt Gym",
      phone: "",
      latitude: 0,
      longitude: 0,
    });

    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should check in at a gym", async () => {
    const userId = randomUUID();
    const gymId = "gym-1";

    const { checkIn } = await sut.execute({
      userId,
      gymId,
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Shouldn't check in more than once a day", async () => {
    const userId = randomUUID();
    const gymId = "gym-1";

    vi.setSystemTime(new Date(2022, 1, 1, 11, 0));
    await sut.execute({
      userId,
      gymId,
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(() =>
      sut.execute({
        userId,
        gymId,
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("Should check in more than once if it is on a different day", async () => {
    const userId = randomUUID();
    const gymId = "gym-1";

    vi.setSystemTime(new Date(2022, 1, 1, 11, 0));
    await sut.execute({
      userId,
      gymId,
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2022, 1, 2, 11, 0));
    const { checkIn } = await sut.execute({
      userId,
      gymId,
      userLatitude: 0,
      userLongitude: 0,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Should check in at a near gym", async () => {
    const userId = randomUUID();
    const gymId = "gym-1";

    vi.setSystemTime(new Date(2022, 1, 1, 11, 0));
    const { checkIn } = await sut.execute({
      userId,
      gymId,
      userLatitude: 0,
      userLongitude: 0,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Shouldn't check in at a distant gym", async () => {
    const userId = randomUUID();
    const gymId = "gym-1";

    vi.setSystemTime(new Date(2022, 1, 1, 11, 0));
    await expect(() =>
      sut.execute({
        userId,
        gymId,
        userLatitude: 1000,
        userLongitude: 1000,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
