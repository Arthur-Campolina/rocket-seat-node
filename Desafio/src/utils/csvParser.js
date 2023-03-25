import fs from 'node:fs'
import csv from 'csv-parser'
import { Transform, Writable } from 'node:stream'
import { randomUUID } from 'node:crypto'

export function csvParser() {
    // if (!data) return console.log('No data found!')
    const tasks = []
    const transformData = new Transform({
        objectMode: true,
        transform: (chunk, _, callback) => {
            // Skip the first row (header row) of the CSV file
            if (chunk.title === 'title') return callback();

            // Format the data to match the database schema
            const task = {
                id: randomUUID(),
                title: chunk.title,
                description: chunk.description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date(),
            };
            callback(null, JSON.stringify(task));
        },
    });

    const writeData = new Writable({
        write(chunk, encoding, callback) {
            const string = chunk.toString()
            const data = JSON.parse(string)
            tasks.push(data)
            callback(null, JSON.stringify(data))
        }
    })

    console.log('Streaming started!')
    return new Promise((resolve, reject) => {
        fs.createReadStream('data.csv')
            .pipe(csv())
            .pipe(transformData)
            .pipe(writeData)
            .on('finish', () => {
                console.log('Streaming finished!')
                resolve(tasks)
            })
            .on("error", function (error) {
                console.error(error.message)
                reject(error);
            });
    })
}
