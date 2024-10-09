import http from 'node:http'

import { routes } from './routes.js'
import { extractQueryParams } from './utils/extractQueryParams.js'

const PORT = 3333

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    console.log(buffers)
    try {
        const formattedBuffers = Buffer.concat(buffers).toString()
        console.log(formattedBuffers)
        req.body = JSON.parse(formattedBuffers)
    } catch {
        req.body = null
    }

    res.setHeader('Content-type', 'application/json')

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)
        const { query, ...params } = routeParams.groups
        req.params = params
        req.query = query ? extractQueryParams(query) : {}
        return route.handler(req, res)
    }
})

server.listen(PORT, () => {
    console.log("Server's up!")
})
