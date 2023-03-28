import fastify from 'fastify'

const app = fastify()

app.get('/task', () => {
  return console.log('Blim blau')
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server running on port 3333')
  })
