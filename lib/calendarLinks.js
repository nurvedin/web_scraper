const request = require('request')
const cheerio = require('cheerio')

function calendarLinks (link, callback) {
  request(link, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html)
      const allLinks = $('a')
      allLinks.each(function () {
        if ($(this).attr('href').substr(27, 38) === 'calendar/') {
          const calendar = $(this).attr('href')
          // console.log(calendar)
          return paul(calendar)
          // return peter(calendar)
          // return mary(calendar)
        }
      })
    }
  })
}

function paul (calendarLinks) {
  request(calendarLinks, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html)
      const personalLinks = $('a')
      // console.log(personalLinks)
      personalLinks.each(function () {
        const sub = 'paul'
        // console.log($(this).attr('href').includes(sub))
        if ($(this).attr('href').includes(sub)) {
          console.log($(this).attr('href'))
          return peter(calendarLinks)
        }
      })
    }
  })
}

function peter (calendarLinks) {
  request(calendarLinks, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html)
      const personalLinks = $('a')
      personalLinks.each(function () {
        const sub = 'peter'
        // console.log($(this).attr('href').includes(sub))
        if ($(this).attr('href').includes(sub)) {
          console.log($(this).attr('href'))
          return mary(calendarLinks)
        }
      })
    }
  })
}

function mary (calendar) {
  request(calendar, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html)
      const personalLinks = $('a')
      personalLinks.each(function () {
        const sub = 'mary'
        // console.log($(this).attr('href').includes(sub))
        if ($(this).attr('href').includes(sub)) {
          console.log($(this).attr('href'))
          return mary(calendarLinks)
        }
      })
    }
  })
}

module.exports = calendarLinks
