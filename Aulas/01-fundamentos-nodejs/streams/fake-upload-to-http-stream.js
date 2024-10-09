import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 5) {
                this.push(null)
            } else {
                const buff = Buffer.from(String(i))
                this.push(buff)
            }
        }, 1000);
    }
}

// possível abrir um canal e mantelo aberto
fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half'
}).then(res => {
    return res.text()
}).then(res => {
    console.log(res)
})
