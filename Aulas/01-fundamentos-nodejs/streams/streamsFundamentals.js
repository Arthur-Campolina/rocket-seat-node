import { Readable, Writable, Transform } from 'node:stream'

//stdin = tudo que o usuário digita no terminal
//stdout = tudo que o terminal retorna
//para testar - node streams/stream.js
//consigo já trabalhar com o dado (Writable) enquanto o arquivo ainda está sendo lido (Readable)
//readable, writable e transform tem metodos obrigatórios. ex: readable => metodo obrigatório _read() {}


class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buff = Buffer.from(String(i))
                this.push(buff)
            }
        }, 1000)
    }
}

class NegativeNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = Number(chunk.toString())
        const negativeNumber = number * -1
        callback(null, Buffer.from(String(negativeNumber)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new NegativeNumberStream)
    .pipe(new MultiplyByTenStream)
