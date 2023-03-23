import fs from 'node:fs'
import csv from 'csv-parser'
import { Transform, Writable } from 'node:stream'

export async function csvParser(data) {
    if (!data) return console.log('No data found!')
    const readableStream = fs.createReadStream(data)
    const transformStreamToObject = csv({ separator: ':' })
    const transformStreamToString = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            callback(null, JSON.stringfy(chunk))
        },
    })
    const writabelStream = new Writable({
        write(chunk, encoding, callback) {
            const string = chunk.toString()
            const data = JSON.parse(string)
        }
    })

}
console.log('CSV parsing start!', Date())
readableStream
    .pipe(transformStreamToObject)
    .pipe(transformStreamToString)
    .pipe(writabelStream)
    .on('close', () => console.log('CSV parsing end!', Date()))