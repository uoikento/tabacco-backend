const genresRouter = require('express').Router()
const axios = require('axios')
// const querystring = require('querystring')

const getLocates = () => {
  const key = process.env.API_KEY
  const baseUrl = `https://webservice.recruit.co.jp/hotpepper/genre/v1/?key=${key}&format=json`
  // const apikey = `${baseUrl}?${key}`
  console.log(baseUrl)
  return (
    axios
      .get(baseUrl)
      .then(response => {
        if (response) {
          return response.data["results"]
        } else {
          response.status(404)
        }
      })
      .catch(error => {
        console.log(error)
      })
  )
}
genresRouter.get('/', (rep, res) => {
  getLocates()
  .then(locates => {
    res.json(locates)
    // console.log(locates)
  })
})

module.exports = genresRouter
