import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

export async function refreshTokenController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // checks if exists a refresh token in the request
  await request.jwtVerify({ onlyCookie: true });

  // creates a new jwt token and a new refresh token
  const token = await reply.jwtSign(
    {  
      role: request.user.role,
    },
    {
      sign: {
        sub: request.user.sub,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    {
      role: request.user.role,
    },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d",
      },
    }
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(StatusCodes.OK)
    .send({ token });
}
