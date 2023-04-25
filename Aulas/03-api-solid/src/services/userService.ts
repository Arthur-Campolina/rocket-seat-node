// import { prisma } from "@/lib/prisma";
import { UserRepository } from "@/repositories/userRepository";
import { parseRequestBodyUser } from "@/utils/parseRequestBodyUser";
import { FastifyRequest } from "fastify";

export async function registerUser(request: FastifyRequest) {
  const body = await parseRequestBodyUser(request);
  // const isThereUserWithSameEmail = await prisma.user.findUnique({
  //   where: {
  //     email: body.email,
  //   },
  // });
  // if (isThereUserWithSameEmail)
  //   throw new Error(`E-mail already exists! ${body.email}`);

  const userRepository = new UserRepository();
  const user = await userRepository.create(body);
  return user;
}
