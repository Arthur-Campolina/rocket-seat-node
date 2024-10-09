import http from 'node:http'

import { routes } from './routes.js'
import { extractQueryParams } from './utils/extractQueryParams.js'
import { bufferMiddleware } from './middlewares/middleware.js'

const PORT = 3333

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await bufferMiddleware(req, res)

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
