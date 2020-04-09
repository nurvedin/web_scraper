const cheerio = require('cheerio')
const axios = require('axios')
const request = require('request')
const link = 'http://vhost3.lnu.se:20080/weekend'

const getLinks = async () => {
  const html = await axios.get(link)
  const $ = cheerio.load(html.data)
  const allLinks = $('a')
  var dinner
  var linkArr = []
  allLinks.each(function (i, link) {
    linkArr.push($(link).attr('href'))
    dinner = linkArr[2]
  })
  return dinner
}

const cookie = async () => {
  const dinner = await getLinks()

  return new Promise((resolve, reject) => {
    request.post({
      url: dinner + '/login',
      form: {
        username: 'zeke',
        password: 'coys',
        submit: 'login'
      }
    }, async function (error, response, body) {
      if (error) {
        reject(error)
      }
      const cookie = response.headers['set-cookie']
      resolve(cookie)
    })
  })
}

const getDinner = async () => {
  const dinner = await getLinks()

  const setCookie = await cookie()
  return new Promise((resolve, reject) => {
    request({
      url: dinner + '/login/booking',
      headers: {
        Cookie: setCookie
      }
    }, async function (error, response, body) {
      if (error) {
        reject(error)
      }
      resolve(body)
    })
  })
}

const dinnerLink = async () => {
  const dinner = await getDinner()
  const html = await axios.get(dinner)
  const $ = cheerio.load(html.data)
  const freeDinnerTime = $('type').attr('radio')
  console.log(freeDinnerTime)
  // console.log(html.text())
  // const $ = cheerio.load(html.data)

  // console.log($.text())
}

module.exports = { dinnerLink }
