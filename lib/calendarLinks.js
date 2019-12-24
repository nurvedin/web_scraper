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
      personalLinks.each(function () {
        const sub = 'paul'
        if ($(this).attr('href').includes(sub)) {
          const paul = $(this).attr('href')
          request(calendarLinks + paul, (error, response, html) => {
            if (!error && response.statusCode === 200) {
              const $ = cheerio.load(html)
              const days = $('th').text()
              const available = $('td').text()
              const dayArr = [days.split('day', 3)]
              const availableArr = [available.match(/.{1,2}/g)]

              if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'ok') {
                return 'Friday'
              } else if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'OK') {
                return 'Friday'
              } else if (dayArr[0][1] === 'Satur' && availableArr[0][1] === 'ok') {
                return 'Saturday'
              } else if (dayArr[0][1] === 'Satur' && availableArr[0][1] === 'OK') {
                return 'Saturday'
              } else if (dayArr[0][2] === 'Sun' && availableArr[0][2] === 'ok') {
                return 'Sunday'
              } else if (dayArr[0][2] === 'Sun' && availableArr[0][2] === 'OK') {
                return 'Sunday'
              }
            }
          })
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
        if ($(this).attr('href').includes(sub)) {
          const peter = $(this).attr('href')
          request(calendarLinks + peter, (error, response, html) => {
            if (!error && response.statusCode === 200) {
              const $ = cheerio.load(html)
              const days = $('th').text()
              const available = $('td').text()
              const dayArr = [days.split('day', 3)]
              const availableArr = [available.match(/.{1,2}/g)]

              if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'ok') {
                return 'Friday'
              } else if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'OK') {
                return 'Friday'
              } else if (dayArr[0][1] === 'Satur' && availableArr[0][1] === 'ok') {
                return 'Saturday'
              } else if (dayArr[0][1] === 'Satur' && availableArr[0][1] === 'OK') {
                return 'Saturday'
              } else if (dayArr[0][2] === 'Sun' && availableArr[0][2] === 'ok') {
                return 'Sunday'
              } else if (dayArr[0][2] === 'Sun' && availableArr[0][2] === 'OK') {
                return 'Sunday'
              }
            }
          })
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
        if ($(this).attr('href').includes(sub)) {
          const mary = $(this).attr('href')
          request(calendarLinks + mary, (error, response, html) => {
            if (!error && response.statusCode === 200) {
              const $ = cheerio.load(html)
              const days = $('th').text()
              const available = $('td').text()
              console.log(days)
              console.log(available)
              const dayArr = [days.split('day', 3)]
              const availableArr = [available.match(/.{1,2}/g)]

              if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'ok') {
                return 'Friday'
              } else if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'OK') {
                return 'Friday'
              } else if (dayArr[0][1] === 'Satur' && availableArr[0][1] === 'ok') {
                return 'Saturday'
              } else if (dayArr[0][1] === 'Satur' && availableArr[0][1] === 'OK') {
                return 'Saturday'
              } else if (dayArr[0][2] === 'Sun' && availableArr[0][2] === 'ok') {
                return 'Sunday'
              } else if (dayArr[0][2] === 'Sun' && availableArr[0][2] === 'OK') {
                return 'Sunday'
              }
            }
          })
        }
      })
    }
  })
}

module.exports = calendarLinks
