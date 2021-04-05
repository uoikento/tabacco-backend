const areasRouter = require('express').Router()
const axios = require('axios')
const querystring = require('querystring')

const getAreas = (large_area, keyword) => {
  const params = {
    key: process.env.API_KEY,
    format: 'json',
    large_area: large_area,
    keyword: `${keyword}`
  }
  if (params.keyword == 'undefined') {
    delete params.keyword
  }
  const result = querystring.stringify(params)
  const baseUrl = `http://webservice.recruit.co.jp/hotpepper/middle_area/v1/?${result}`
  console.log(baseUrl)
  return (
    axios
      .get(baseUrl)
      .then(res => {
        if (res) {
          console.log(res.data["results"])
          return res.data["results"]
        } else {
          res.status(404)
        }
      })
      .catch(error => {
        console.log(error)
      })
  )
}

areasRouter.post('/', (req, res) => {
  const body = req.body
  console.log(body)
  getAreas(body.large_area, body.keyword)
    .then(areas => {
    res.json(areas)
  })
})

module.exports = areasRouter