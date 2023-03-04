import http from 'node:http'
import { json } from './middlewares/json.js'

const users = []

const server = http.createServer(async (request, response) => {
    const { method, url } = request

    await json(request, response)

    if (method === 'GET' && url === '/users') {
        return response.end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'Jhon Doe',
            email: 'jhondoes@gmail.com'
        })

        return response.writeHead(201).end("User Created")
    }

    return response.writeHead(404).end("Not Found")

})

server.listen(3333)