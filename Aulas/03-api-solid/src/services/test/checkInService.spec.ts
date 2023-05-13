import { InMemoryCheckInRepository } from "@/repositories/in-memory/inMemoryCheckInRepository";
import { describe, expect, it, beforeEach } from "vitest";
import { CheckInService } from "../checkInService";
import { randomUUID } from "node:crypto";

let checkInRepository: InMemoryCheckInRepository;
let sut: CheckInService;

describe("Check-in Service Test", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository();
    sut = new CheckInService(checkInRepository);
  });

  it("Should check in at a gym", async () => {
    const { checkIn } = await sut.execute({
      userId: randomUUID(),
      gymId: randomUUID(),
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
