import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

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
app.use(corsMiddleware)

app.get('/', (req, res) => {
    res.json({
        message: 'Express REST API',
        routes: [
            'GET /movies/',
            'GET /movies/:id',
            'POST /movies/',
            'DELETE /movies/:id',
            'PATCH /movies/:id',
        ],
    })
})

app.use('/movies', moviesRouter)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
