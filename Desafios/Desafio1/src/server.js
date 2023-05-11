import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

const server = http.createServer(async (req, res) => {
    const { method, url } = req
    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })
    if (route !== undefined) {
        await json(req, res)
        const routeParams = req.url.match(route.path)
        const { query, ...params } = routeParams.groups
        req.params = params
        req.query = query ? extractQueryParams(query) : {}
        return route.handler(req, res)
    } else {
        res.setHeader('Content-Type', 'text/plain')
        return res.writeHead(404).end(`URL not found! URL: ${url}`)
    }
})

server.listen(3333, () => {
    console.log('Server listening on port 3333')
})