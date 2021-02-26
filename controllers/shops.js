const shopsRouter = require('express').Router()
const axios = require('axios')
const querystring = require('querystring')
const baseUrl = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/'

const getShop = (keyword, genre, lat, lng) => {
  const params = {
    key: process.env.API_KEY,
    format: 'json',
    count: 100,
    keyword: `${keyword}`,
    genre: `${genre}`,
    lat: `${lat}`,
    lng: `${lng}`
  }
  if (params.genre == 'undefined') {
    delete params.genre
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

shopsRouter.post('/', (request, response) => {
  const body = request.body
  console.log(body)
  getShop(body.keyword,body.genre, body.lat, body.lng)
    .then(shops => {
      response.json(shops)
  })
})

module.exports = shopsRouter