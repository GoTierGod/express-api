import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { getData } from './utils/getData.js'
import { validateMovie, validatePartialMovie } from './schemas/movie.js'
import crypto from 'crypto'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Config
app.set('x-powered-by', false)
app.set('json scape', true)
app.set('json spaces', 4)
app.set('strict routing', false)

// Middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
    cors({
        origin: 'http://localhost:3000/',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204,
    }),
)

// Get method
app.get('/', (req, res) => {
    res.json({
        message: 'hello world',
    })
})

app.get('/movies', async (req, res) => {
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

app.get('/movies/:id', async (req, res) => {
    const data = await getData()

    const { id } = req.params
    const movie = data.find((m) => m.id === id)

    if (movie) return res.json(movie)
    return res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', async (req, res) => {
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

app.patch('/movies/:id', async (req, res) => {
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

app.use((req, res) => {
    return res.status(404).json({ message: 'not found' })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
