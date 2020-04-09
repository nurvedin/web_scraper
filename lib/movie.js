const axios = require('axios')
const cheerio = require('cheerio')
// const availableDay = require('./calendarLinks')
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
}

const cinemaLink = async () => {
  const cinema = await getLinks()
  const html = await axios.get(cinema)
  const $ = cheerio.load(html.data)
  const movieDay = $('#day option').filter("[value^='0']")
  var dayArr = []
  var movieArr = []

  const availableMovie = $('#movie option').filter("[value^='0']")
  availableMovie.each(function (i, link) {
    movieArr.push($(link).attr('value'))
  })

  movieDay.each(function (i, link) {
    dayArr.push($(link).attr('value'))
  })

  const cinemaTimes = []

  for (let i = 0; i < movieArr.length; i++) {
    const link = `http://vhost3.lnu.se:20080/cinema/check?day=05&movie=${movieArr[i]}`
    const checkFreeTime = await axios.get(link)

    for (let j = 0; j < checkFreeTime.data.length; j++) {
      if (checkFreeTime.data[j].status === 1) {
        cinemaTimes.push(checkFreeTime.data[j])
      }
    }
  }

  // return cinemaTimes
  // console.log(cinemaTimes)

  const friday = '05'
  const saturday = '06'
  const sunday = '07'

  for (let i = 0; i < dayArr.length; i++) {
    if (dayArr[i] === friday || dayArr[i] === saturday || dayArr[i] === sunday) {
      // console.log(freeDay)
    }
  }
}

module.exports = { cinemaLink }
