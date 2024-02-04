import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

const port = process.env.PORT || 3000

app.set('x-powered-by', false)
app.set('json scape', true)
app.set('json spaces', 4)
app.set('strict routing', false)

app.get('/', (req, res) => {
    res.send(app.locals)
})

app.listen(port)
