import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { getData } from './utils/getData.js'

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
            m.Genre.toLowerCase().includes(genre.toLowerCase()),
        )

        return res.json(filtered)
    }

    return res.json(data)
})

app.get('/movies/:id', async (req, res) => {
    const data = await getData()

    const { id } = req.params
    const movie = data.find((m) => m.id === Number(id))

    if (movie) return res.json(movie)
    return res.status(404).json({ message: 'Movie not found' })
})

app.use((req, res) => {
    return res.status(404).json({ message: 'not found' })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
