const axios = require('axios')
const cheerio = require('cheerio')
const availableDay = require('./calendarLinks')
const args = process.argv.slice(2)[0]

const getLinks = async () => {
  const html = await axios.get(args)
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
  const freeDay = await availableDay.availableDays()
  const html = await axios.get(cinema)
  const $ = cheerio.load(html.data)
  var dayArr = []
  var movieArr = []

  for (let i = 0; i < freeDay.length; i++) {
    if (freeDay[i] === 'friday') {
      dayArr.push('05')
    }
    if (freeDay[i] === 'saturday') {
      dayArr.push('06')
    }
    if (freeDay[i] === 'sunday') {
      dayArr.push('07')
    }
  }

  const availableMovie = $('#movie option').filter("[value^='0']")

  availableMovie.each(function (i, link) {
    if (link.attribs.value) {
      movieArr.push({
        name: link.firstChild.data,
        value: link.attribs.value
      })
    }
  })

  const cinemaTimes = []
  let checkFreeTime
  let link

  for (let i = 0; i < movieArr.length; i++) {
    for (let k = 0; k < dayArr.length; k++) {
      link = `${cinema}/check?day=${dayArr[k]}&movie=${movieArr[i].value}`

      checkFreeTime = await axios.get(link)

      for (let j = 0; j < checkFreeTime.data.length; j++) {
        if (checkFreeTime.data[j].status === 1 && checkFreeTime.data[j].day === dayArr[k]) {
          cinemaTimes.push({
            status: checkFreeTime.data[j].status,
            day: checkFreeTime.data[j].day,
            time: checkFreeTime.data[j].time,
            movie: checkFreeTime.data[j].movie,
            movieTitle: movieArr[i].name
          })
        }
      }
    }
  }

  return cinemaTimes
}

module.exports = { cinemaLink }
