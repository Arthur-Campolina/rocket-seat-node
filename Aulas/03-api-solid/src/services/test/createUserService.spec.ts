import { beforeEach, describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/inMemoryUserRepository";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { CreateUserService } from "../createUserService";

let userRepository: InMemoryUserRepository;
let sut: CreateUserService;

describe("User Service Test", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new CreateUserService(userRepository);
  });

  it("should register successfully", async () => {
    const user = await sut.execute({
      name: "Jhon",
      email: "jhondoe@gmail.com",
      password: "12345678",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { password } = await sut.execute({
      name: "Jhon",
      email: "jhondoe@gmail.com",
      password: "12345678",
    });
    const isPasswordCorrectlyHashed = await compare("12345678", password);
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("shouldn't register same email twice", async () => {
    const email = "jhondoe@gmail.com";

    await sut.execute({
      name: "Jhon",
      email,
      password: "12345678",
    });

    expect(async () => {
      await sut.execute({
        name: "Jhon",
        email,
        password: "12345678",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
