require('dotenv').config()
const axios = require('axios')
const querystring = require('querystring')

const baseUrl = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/'
const keyword = 'yakiniku'
const params = {
  key: process.env.API_KEY,
  format: 'json',
  keyword: `${keyword}`,
  count: 5,
}
const result = querystring.stringify(params)
console.log(result)
const url = `${baseUrl}?${result}`

const getRequest = axios.get(url)
const getAll = getRequest
  .then(response => {
    if (response) {
      return response.data
    } else {
      response.status(404)
    }
  })
  .catch(error => {
    console.log(error)
  })

const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
  getAll.then(shops => { 
    response.json(shops)
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log('running')
})