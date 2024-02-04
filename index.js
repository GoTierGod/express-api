import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'

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

app.use((req, res) => {
    res.status(404).json({ message: 'not found' })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
