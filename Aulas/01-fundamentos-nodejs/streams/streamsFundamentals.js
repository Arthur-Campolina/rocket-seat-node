// tudo que recebo na entrada (writable stream - process.stdin) 
// encaminho (pipe) 
// para uma saída (readable stram - process.stdout)
process.stdin.pipe(process.stdout)


import { Readable, Writable, Transform } from 'node:stream'

// streams trabalham com BUFFER
class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++
        // buffers são construidos somente para valores do tipo string
        const buffer = Buffer.from(String(i))

        // null ends the stram
        if (i > 100) this.push(null)
        else setTimeout(() => this.push(buffer), 1000)
    }
}

class TranformNumberStream extends Transform {
    _transform(chunk, _encoding, callback) {
        const transformedValue = Buffer.from(String(Number(chunk.toString()) * -10))

        //primeiro parametro é error (null se nao for erro)
        callback(null, transformedValue)
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, _encoding, callback) {
        console.log(chunk.toString())

        // cuida da finalizaçâo ou erro
        callback()
    }
}

// ja exibo dados da stream antes dela ja estar toda completa, ante de ter todo o "arquivo"
new OneToHundredStream()
    .pipe(new TranformNumberStream())
    .pipe(new MultiplyByTenStream())