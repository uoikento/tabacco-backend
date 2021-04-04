require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const shopsRouter = require('./controllers/shops')
const genresRouter = require('./controllers/genres')
const areasRouter = require('./controllers/areas')

app.use(cors())
// app.use(express.static('build'))
app.use(express.json())
app.use('/api/shops', shopsRouter)
app.use('/api/genres', genresRouter)
app.use('/api/areas', areasRouter)

app.get('/', (request, response) => {
  response.send('hello')
})


module.exports = app