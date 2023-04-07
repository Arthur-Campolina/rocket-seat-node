import fastify from "fastify";
import { userRoutes } from "./routes/userRoutes";
import cookie from '@fastify/cookie'
import { userMealRoutes } from "./routes/userMealRoutes";
import { mealRoutes } from "./routes/mealRoutes";

export const app = fastify()

app.register(cookie)
app.register(userRoutes, {
    prefix: 'users',
})
app.register(mealRoutes, {
    prefix: 'meals',
})
app.register(userMealRoutes, {
    prefix: 'userMeals',
})