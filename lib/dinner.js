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
  const html = await getDinner()
  // const html = await axios.get(dinner)

  // console.log(dinner.axios)
  const $ = cheerio.load(html)
  // const div = $().html()
  // console.log($('input[type="radio"]').text())
  const radioButtons = $('input[type="radio"]')
  const freeDinnerTime = []

  radioButtons.each(function (i, link) {
    var day = ''
    var dayID
    if ($(link).attr('value').substring(0, 3) === 'fri') {
      day = 'friday'
      dayID = '05'
    }
    if ($(link).attr('value').substring(0, 3) === 'sat') {
      day = 'saturday'
      dayID = '06'
    }
    if ($(link).attr('value').substring(0, 3) === 'sun') {
      day = 'sunday'
      dayID = '07'
    }
    var obj = { day: day, dayID: dayID, startTime: parseInt($(link).attr('value').substring(3).substring(2) + '00') - 200 }
    freeDinnerTime.push(obj)
    freeDinnerTime.push($(link).attr('value'))
  })
  return freeDinnerTime

  // console.log(freeDinnerTime)
  // console.log($('p'))
  // const radioButtons = $('input')
  // const
  // console.log($('input').attr('radio'))
  // const freeDinnerTime = $('input').attr('radio')
  // console.log($)
  // console.log(html.text())
  // const $ = cheerio.load(html.data)

  // console.log($.text())
}

module.exports = { dinnerLink }
