const axios = require('axios')
const cheerio = require('cheerio')
const availableDay = require('./calendarLinks')
const link = 'http://vhost3.lnu.se:20080/weekend'

const getLinks = async () => {
  const html = await axios.get(link)
  const $ = cheerio.load(html.data)
  const allLinks = $('a')
  var cinema
  var linkArr = []
  allLinks.each(function (i, link) {
    linkArr.push($(link).attr('href'))
    cinema = linkArr[1]
  })
  return cinema
  // console.log(cinema)
}

const cinemaLink = async () => {
  const cinema = await getLinks()
  // console.log(cinema)
  const freeDay = await availableDay.availableDays()
  // console.log(freeDay)
  const firstMovie = 'http://vhost3.lnu.se:20080/cinema/check?day=05&movie=01'
  const secondMovie = 'http://vhost3.lnu.se:20080/cinema/check?day=05&movie=02'
  const thirdMovie = 'http://vhost3.lnu.se:20080/cinema/check?day=05&movie=03'
  const friday = 'day05'
  const saturday = 'day06'
  const sunday = 'day07'
  const movie1 = await axios.get(firstMovie)
  const movie2 = await axios.get(secondMovie)
  const movie3 = await axios.get(thirdMovie)
  const $ = cheerio.load(movie1.data)
  console.log($('<div id="message">').text())
  // const $ = cheerio.load(html.data)
  // const days = $('select').attr('name', 'day')
  // const dayArr = []
  // dayArr.push(days)
  // console.log(days.text())
}

module.exports = { cinemaLink }
/*
request(link, (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const linkArr = []
    const $ = cheerio.load(html)
    const links = $('a')
    links.each(function () {
      const allLinks = $(this).attr('href')
      linkArr.push(allLinks)
    })
    // const cinema = linkArr[1]
    const firstMovie = 'http://vhost3.lnu.se:20080/cinema/check?day=05&movie=01'
    const secondMovie = 'http://vhost3.lnu.se:20080/cinema/check?day=05&movie=02'
    const thirdMovie = 'http://vhost3.lnu.se:20080/cinema/check?day=05&movie=03'
    const time = []
    request(firstMovie, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = JSON.parse(html)
        for (let i = 0; i < $.length; i++) {
          var objectArr = $[i]
          if (objectArr.status === 1) {
            time.push('First movie ' + objectArr.time)
          }
        }
      }
      // console.log(time)
    })

    request(secondMovie, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = JSON.parse(html)
        for (let i = 0; i < $.length; i++) {
          var objectArr = $[i]
          if (objectArr.status === 1) {
            time.push('Second Movie ' + objectArr.time)
          }
        }
      }
      // console.log(time)
    })
    request(thirdMovie, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = JSON.parse(html)
        for (let i = 0; i < $.length; i++) {
          var objectArr = $[i]
          if (objectArr.status === 1) {
            time.push('Third movie ' + objectArr.time)
          }
        }
      }
      // console.log(time)
    })
  }
})
*/
