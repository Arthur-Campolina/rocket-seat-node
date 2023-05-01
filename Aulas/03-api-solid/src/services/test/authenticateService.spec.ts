import { describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/inMemoryUserRepository";
import { AuthenticateService } from "../authenticateService";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

describe("Authenticate Service Test", () => {
  it("should authenticate successfully", async () => {
    const userRepository = new InMemoryUserRepository();
    const userService = new AuthenticateService(userRepository);

    await userRepository.create({
      name: "Jhon Doe",
      email: "jhondoe@gmail.com",
      password: await hash("12345678", 6),
    });

    const { user } = await userService.execute({
      email: "jhondoe@gmail.com",
      password: "12345678",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("shouldn't authenticate with wrong e-mail", async () => {
    const userRepository = new InMemoryUserRepository();
    const userService = new AuthenticateService(userRepository);

    await expect(() =>
      userService.execute({
        email: "jhondoe@errortest.com",
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("shouldn't authenticate with wrong password", async () => {
    const userRepository = new InMemoryUserRepository();
    const userService = new AuthenticateService(userRepository);

    await userRepository.create({
      name: "Jhon Doe",
      email: "jhondoe@gmail.com",
      password: await hash("12345678", 6),
    });

    await expect(() =>
      userService.execute({
        email: "jhondoe@gmail.com",
        password: "12312345",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
