import { describe, expect, it } from "vitest";
import { UserService } from "../userService";
import { compare } from "bcryptjs";

describe("User Service Test", () => {
  it("should hash user password upon registration", async () => {
    const userService = new UserService({
      async findByEmail(email) {
        return null;
      },
      async create(data) {
        return {
          id: "userTest1",
          name: data.name,
          email: data.email,
          cpf: null,
          age: null,
          password: data.password,
          isActive: true,
          created_at: new Date(),
          updated_at: new Date(),
        };
      },
    });
    const { password } = await userService.execute({
      name: "Jhon",
      email: "jhondoe@gmail.com",
      password: "12345678",
    });
    const isPasswordCorrectlyHashed = await compare("12345678", password);
    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
