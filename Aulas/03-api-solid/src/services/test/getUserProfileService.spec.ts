import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/inMemoryUserRepository";
import { hash } from "bcryptjs";
import { GetUserProfileService } from "../getUserProfileService";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let userRepository: InMemoryUserRepository;
let sut: GetUserProfileService;

describe("Get User Profile Test", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new GetUserProfileService(userRepository);
  });

  it("should get user profile", async () => {
    const createdUser = await userRepository.create({
      name: "Jhon Doe",
      email: "jhondoe@gmail.com",
      password: await hash("12345678", 6),
    });

    const { user } = await sut.execute({
      id: createdUser.id,
    });

    expect(user.name).toEqual("Jhon Doe");
  });

  it("shouldn't get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        id: "not-existent-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
