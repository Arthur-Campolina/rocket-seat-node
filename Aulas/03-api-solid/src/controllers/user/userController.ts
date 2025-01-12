import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { makeCreateUserService } from "@/services/factories/make-createUserService";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

export async function userController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = createUserBodySchema.parse(request.body);

  try {
    const createUserService = makeCreateUserService();

    await createUserService.execute({
      name,
      email,
      password,
    });

    return reply.status(StatusCodes.CREATED).send();
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) 
      return reply.status(StatusCodes.CONFLICT).send({ error: err.message });
    
    return err
  }
}
