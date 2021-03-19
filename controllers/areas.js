const arerasRouter = require('express').Router()
const axios = require('axios')

const getAreas = () => {
  const key = process.env.API_KEY
  const baseUrl = `http://webservice.recruit.co.jp/hotpepper/large_area/v1/?key=${key}&format=json`
  return (
    axios
      .get(baseUrl)
      .then(res => {
        if (res) {
          console.log(res.data)
          return res.data["results"]["large_area"]
        } else {
          res.status(404)
        }
      })
      .catch(error => {
        console.log(error)
      })
  )
}
arerasRouter.get('/', (req, res) => {
  getAreas()
    .then(areas => {
    res.json(areas)
  })
})

module.exports = arerasRouter