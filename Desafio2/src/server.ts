import fastify from "fastify";
import { userRoutes } from "../routes/userRoutes";

const app = fastify()
app.register(userRoutes, {
    prefix: 'users',
})

app.listen({
    port: 3333
}).then(() => {
    console.log('Server is running on port 3333')
})