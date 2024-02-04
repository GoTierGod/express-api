import path from 'path'
import fs from 'fs/promises'

export const getData = async () => {
    try {
        const jsonData = await fs.readFile('data.json', 'utf-8')
        const data = JSON.parse(jsonData)

        return data
    } catch (err) {
        console.error('Error reading or parsing data', err)
        throw err
    }
}
