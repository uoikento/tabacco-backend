require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')

app.use(cors())
app.use(express.json())
const querystring = require('querystring')
const baseUrl = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/'

const getShop = (keyword) => {
  const params = {
    key: process.env.API_KEY,
    format: 'json',
    keyword: `${keyword}`,
    count: 5,
  }
  const result = querystring.stringify(params)
  // console.log(`渡すクエリは${result}`)
  const apiUrl = `${baseUrl}?${result}`
  console.log(apiUrl)
  return (
    axios
      .get(apiUrl)
      .then(response => {
        if (response) {
          return response.data["results"]["shop"]
        } else {
          response.status(404)
        }
      })
      .catch(error => {
        console.log(error)
      })
  )
}

app.get('/', (request, response) => {
  const body = request.body
  console.log(body)
  getShop(body)
    .then(shops => {
      response.json(shops)
      console.log(shops)
    })
    .catch(error => {
      console.log(error)
    })
})
// このPOSTはフロントにデータを取りに行くためPOST

app.post('/', (request, response, next) => {
  const body = request.body.keyword
  console.log(body)
  getShop(body)
    .then(shops => {
      response.json(shops)
  })
})
const PORT = 3001
app.listen(PORT, () => {
  console.log('running')
})