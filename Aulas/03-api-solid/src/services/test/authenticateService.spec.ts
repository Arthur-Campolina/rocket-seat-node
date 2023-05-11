import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/inMemoryUserRepository";
import { AuthenticateService } from "../authenticateService";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let userRepository: InMemoryUserRepository;
let sut: AuthenticateService;

describe("Authenticate Service Test", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new AuthenticateService(userRepository);
  });

  it("should authenticate successfully", async () => {
    await userRepository.create({
      name: "Jhon Doe",
      email: "jhondoe@gmail.com",
      password: await hash("12345678", 6),
    });

    const { user } = await sut.execute({
      email: "jhondoe@gmail.com",
      password: "12345678",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("shouldn't authenticate with wrong e-mail", async () => {
    await expect(() =>
      sut.execute({
        email: "jhondoe@errortest.com",
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("shouldn't authenticate with wrong password", async () => {
    await userRepository.create({
      name: "Jhon Doe",
      email: "jhondoe@gmail.com",
      password: await hash("12345678", 6),
    });

    await expect(() =>
      sut.execute({
        email: "jhondoe@gmail.com",
        password: "12312345",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
