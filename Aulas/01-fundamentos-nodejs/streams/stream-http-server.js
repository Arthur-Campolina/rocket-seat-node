import http from 'node:http'
import { Transform } from 'node:stream'

const waitForAllChunks = true

// seria possível persistir os chunks (dados) no serviddor aos poucos
class InvertNumberSignStream extends Transform {
    _transform(chunk, _encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        console.log(transformed)
        callback(null, Buffer.from(String(transformed)))
    }
}

// tudo no node é stream, logo... req is a readable stream and res is a writable stream
const server = http.createServer(async (req, res) => {
    // é possível receber todos os chunks para entâo fazer algo
    if (waitForAllChunks) {
        const buffers = []

        for await (const chunk of req) {
            buffers.push(chunk)
        }

        const allContent = Buffer.concat(buffers).toString()
        console.log(allContent)
        return res.end(allContent)
    } else {
        // sem esperar todos os chunks
        return req
            .pipe(new InvertNumberSignStream())
            .pipe(res)
    }
})

server.listen(3334)