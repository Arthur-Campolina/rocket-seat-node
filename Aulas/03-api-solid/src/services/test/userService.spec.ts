import { describe, expect, it } from "vitest";
import { UserService } from "../userService";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/inMemoryUserRepository";
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";

describe("User Service Test", () => {
  it("should register successfully", async () => {
    const userRepository = new InMemoryUserRepository();
    const userService = new UserService(userRepository);

    const user = await userService.execute({
      name: "Jhon",
      email: "jhondoe@gmail.com",
      password: "12345678",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const userRepository = new InMemoryUserRepository();
    const userService = new UserService(userRepository);

    const { password } = await userService.execute({
      name: "Jhon",
      email: "jhondoe@gmail.com",
      password: "12345678",
    });
    const isPasswordCorrectlyHashed = await compare("12345678", password);
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("shouldn't register same email twice", async () => {
    const userRepository = new InMemoryUserRepository();
    const userService = new UserService(userRepository);

    const email = "jhondoe@gmail.com";

    await userService.execute({
      name: "Jhon",
      email,
      password: "12345678",
    });

    expect(async () => {
      await userService.execute({
        name: "Jhon",
        email,
        password: "12345678",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
