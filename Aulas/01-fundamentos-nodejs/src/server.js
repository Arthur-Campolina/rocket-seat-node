import http from 'node:http'

const users = []

const server = http.createServer((req, res) => {

    const { method, url } = req

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    } else if (method === 'POST' && url === '/users') {
        const user = {
            id: 1,
            name: 'Arthur Campolina',
            email: 'arthurcampolina@hotmail.com',
        }
        users.push(user)
        return res.writeHead(201)
    } else if (method === 'PUT' && url === '/users') {
        return res.end('Update user')
    } else if (method === 'PATCH' && url === '/users') {
        return res.end('Update user')
    } else if (method === 'DELETE' && url === '/users') {
        return res.end('Delete user')
    } else {
        return res.writeHead(404).end('Not found!')
    }

})

server.listen(3333)