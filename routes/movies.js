import { Router } from 'express'
import { getData } from '../utils/getData.js'
import { validateMovie, validatePartialMovie } from '../schemas/movie.js'

const movies = await getData()
export const moviesRouter = Router()

moviesRouter.get('/', async (req, res) => {
    const data = await getData()

    const { genre } = req.query

    if (genre) {
        const filtered = data.filter((m) =>
            m.genre.filter((g) => g.toLowerCase() === genre.toLowerCase()),
        )

        return res.json(filtered)
    }

    return res.json(data)
})

moviesRouter.get('/:id', async (req, res) => {
    const data = await getData()

    const { id } = req.params
    const movie = data.find((m) => m.id === id)

    if (movie) return res.json(movie)
    return res.status(404).json({ message: 'Movie not found' })
})

moviesRouter.post('/', async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
        return res
            .status(400)
            .json({ message: JSON.parse(result.error.message) })
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data,
    }

    // Save in the database
    // . . .

    return res.status(201).json(newMovie)
})

moviesRouter.patch('/:id', async (req, res) => {
    const result = validatePartialMovie(req.body)

    if (result.error) {
        return res
            .status(400)
            .json({ message: JSON.parse(result.error.message) })
    }

    const data = await getData()

    const { id } = req.params
    const movie = data.find((m) => m.id === id)

    const newMovie = {
        ...movie,
        ...result.data,
    }

    // Update movie in the database
    // . . .

    return res.json(newMovie)
})
