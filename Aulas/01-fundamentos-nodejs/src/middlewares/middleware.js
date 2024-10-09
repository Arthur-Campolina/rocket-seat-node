//middlewares = receptores e sempre recebem o req e res

export async function bufferMiddleware(req, res) {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        const formattedBuffers = Buffer.concat(buffers).toString()
        req.body = JSON.parse(formattedBuffers)
    } catch {
        req.body = null
    }

    res.setHeader('Content-type', 'application/json')
}