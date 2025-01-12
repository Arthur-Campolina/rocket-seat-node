import {FastifyInstance} from "fastify";

import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

import { env } from "../env";
import { userRoutes } from "../controllers/user/userRoutes";
import { gymRoutes } from "../controllers/gym/gymRoutes";
import { checkInRoutes } from "../controllers/checkIn/checkInRoutes";

export async function routes(app: FastifyInstance) {
    app.register(fastifyJwt, {
      secret: env.JWT_SECRET,
      cookie: {
        cookieName: "refreshToken",
        signed: false,
      },
      sign: {
        expiresIn: "10m",
      },
    });

    app.register(fastifyCookie);
    
    app.register(userRoutes);

    app.register(gymRoutes);
    
    app.register(checkInRoutes);
} 