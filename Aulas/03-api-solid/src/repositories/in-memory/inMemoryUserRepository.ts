import { User, Prisma } from "@prisma/client";
import { PrismaUserRepository } from "../prisma/PrismaUserRepository";
import { randomUUID } from "node:crypto";

export class InMemoryUserRepository implements PrismaUserRepository {
  public users: User[] = [];

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) return null;
    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    if (!user) return null;
    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      cpf: null,
      age: null,
      password: data.password,
      isActive: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.users.push(user);
    return user;
  }
}
