import http from 'node:http'

const users = []

const server = http.createServer((request, response) => {
    const { method, url } = request

    if (method === 'GET' && url === '/users') {
        return response
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'Jhon Doe',
            email: 'jhondoes@gmail.com'
        })

        return response.end('User created')
    }

    return response.end("NodeJS é muito fod@!")

})

server.listen(3333)