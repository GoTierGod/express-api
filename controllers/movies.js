import { movieModel } from '../models/movies.js'
import { validateMovie, validatePartialMovie } from '../schemas/movie.js'

export class movieController {
    static async getAll(req, res) {
        const { genre } = req.query
        const movies = await movieModel.getAll({ genre })

        return res.json(movies)
    }

    static async getById(req, res) {
        const { id } = req.query
        const movie = await movieModel.getById({ id })

        if (movie) {
            return res.json(movie)
        }

        return res.status(404).json({ message: 'Movie not found' })
    }

    static async create(req, res) {
        const result = validateMovie(req.body)

        if (!result.success) {
            return res
                .status(400)
                .json({ message: JSON.parse(result.error.message) })
        }

        const newMovie = await movieModel.create({ input: result.data })

        return res.status(201).json(newMovie)
    }

    static async delete(req, res) {
        const { id } = req.params

        const result = await movieModel.delete({ id })

        if (result === false) {
            return res.status(404).json({ message: 'Movie not found' })
        }

        return res.json({ message: 'Movie deleted' })
    }

    static async update(req, res) {
        const result = validatePartialMovie(req.body)

        if (!result.success) {
            return res
                .status(400)
                .json({ message: JSON.parse(result.error.message) })
        }

        const { id } = req.params

        const updatedMovie = await movieModel.update({ id, input: result.data })

        return res.json(updatedMovie)
    }
}
