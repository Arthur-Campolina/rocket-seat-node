import http from 'node:http'
import { Transform } from 'node:stream'

class InvertNumberSignStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        console.log(transformed)
        callback(null, Buffer.from(String(transformed)))
    }
}

const server = http.createServer(async (response, request) => {
    return request
        .pipe(new InvertNumberSignStream())
        .pipe(response)
})

server.listen(3334)