import { app } from './app.js'
import { env } from './env'

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server running on port 3333')
  })
