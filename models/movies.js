import { getData } from '../utils/getData.js'
import { randomUUID } from 'crypto'

const movies = await getData()

export class movieModel {
    static async getAll({ genre }) {
        if (genre) {
            return movies.filter((m) =>
                m.genre.some((g) => g.toLowerCase() === genre.toLowerCase()),
            )
        }

        return movies
    }

    static async getById({ id }) {
        const movie = movies.find((m) => m.id === Number(id))
        return movie
    }

    static async create({ input }) {
        const newMovie = {
            id: randomUUID(),
            ...input,
        }

        movies.push(newMovie)

        return newMovie
    }

    static async delete({ id }) {
        const movieIdx = movies.findIndex((movie) => movie.id === Number(id))
        if (movieIdx === -1) return false

        movies.splice(movieIdx, 1)
        return true
    }

    static async update({ id, input }) {
        const movieIdx = movies.findIndex((movie) => movie.id === Number(id))
        if (movieIdx === -1) return false

        movies[movieIdx] = {
            ...movies[movieIdx],
            ...input,
        }

        return movies[movieIdx]
    }
}
