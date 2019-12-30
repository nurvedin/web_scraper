// const request = require('request')
const cheerio = require('cheerio')
// const rp = require('request-promise')
const axios = require('axios')
const link = 'http://vhost3.lnu.se:20080/weekend'

const getLinks = async () => {
  const html = await axios.get(link)
  const $ = cheerio.load(html.data)
  return $('li a').attr('href')
}

const calendarLink = async () => {
  const calendar = await getLinks()
  const html = await axios.get(calendar)
  const $ = cheerio.load(html.data)
  var urls = []
  $('li a').each((i, elem) => {
    urls[i] = $(elem).attr('href')
  })
  return urls
}

const paul = async () => {
  const link = await getLinks()
  const allLinks = await calendarLink()
  var paul = []
  for (let i = 0; i < allLinks.length; i++) {
    const sub = 'paul'
    if (allLinks[i].includes(sub)) {
      paul.push(allLinks[i])
    }
  }
  const html = await axios.get(link + paul)
  const $ = cheerio.load(html.data)
  const days = $('th').text()
  const available = $('td').text().toLowerCase()
  const dayArr = [days.split('day', 3)]
  const availableArr = [available.match(/.{1,2}/g)]
  const freeDay = []
  if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'ok') {
    freeDay.push(dayArr[0][0])
  }
  if (dayArr[0][1] === 'Satur' && availableArr[0][1] === 'ok') {
    freeDay.push(dayArr[0][1])
  }
  if (dayArr[0][2] === 'Sun' && availableArr[0][2] === 'ok') {
    freeDay.push(dayArr[0][2])
  }
  return freeDay
}

const peter = async () => {
  const link = await getLinks()
  const allLinks = await calendarLink()
  var peter = []
  for (let i = 0; i < allLinks.length; i++) {
    const sub = 'peter'
    if (allLinks[i].includes(sub)) {
      peter.push(allLinks[i])
    }
  }
  const html = await axios.get(link + peter)
  const $ = cheerio.load(html.data)
  const days = $('th').text()
  const available = $('td').text().toLowerCase()
  const dayArr = [days.split('day', 3)]
  const availableArr = [available.match(/.{1,2}/g)]
  const freeDay = []
  if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'ok') {
    freeDay.push(dayArr[0][0])
  }
  if (dayArr[0][1] === 'Satur' && availableArr[0][1] === 'ok') {
    freeDay.push(dayArr[0][1])
  }
  if (dayArr[0][2] === 'Sun' && availableArr[0][2] === 'ok') {
    freeDay.push(dayArr[0][2])
  }
  return freeDay
}

const mary = async () => {
  const link = await getLinks()
  const allLinks = await calendarLink()
  var mary = []
  for (let i = 0; i < allLinks.length; i++) {
    const sub = 'mary'
    if (allLinks[i].includes(sub)) {
      mary.push(allLinks[i])
    }
  }
  const html = await axios.get(link + mary)
  const $ = cheerio.load(html.data)
  const days = $('th').text()
  const available = $('td').text().toLowerCase()
  const dayArr = [days.split('day', 3)]
  const availableArr = [available.match(/.{1,2}/g)]
  const freeDay = []
  if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'ok') {
    freeDay.push(dayArr[0][0])
  }
  if (dayArr[0][1] === 'Satur' && availableArr[0][1] === 'ok') {
    freeDay.push(dayArr[0][1])
  }
  if (dayArr[0][2] === 'Sun' && availableArr[0][2] === 'ok') {
    freeDay.push(dayArr[0][2])
  }
  return freeDay
}

const availableDays = async () => {
  const pau = await paul()
  const pet = await peter()
  const mar = await mary()

  var dayOfDate = []
  if (pau[0] === pet[0] && pau[0] === mar[0]) {
    dayOfDate.push(pau[0])
  } else if (pau[1] === pet[1] && pau[1] === mar[1]) {
    dayOfDate.push(pau[0])
  } else if (pau[2] === pet[2] && pau[2] === mar[2]) {
    dayOfDate.push(pau[0])
  }
  // console.log(dayOfDate + 'day')
  return dayOfDate + 'day'
}
/*
const calendarLinks = function (link) {
  rp(link)
    .then(function (html) {
      const $ = cheerio.load(html)
      var urls = []
      $('li a').each((i, elem) => {
        urls[i] = $(elem).attr('href')
        // console.log(urls[i])
      })
      return urls
    })
}
*/
/*
        if ($(elem).attr('href').substr(27, 38) === 'calendar/') {
          const calendar = urls[i]
          return {
            calendar: calendar
          }
          // console.log(calendar)
        }
*/
/*
const paul = function (calendar) {
  rp('http://vhost3.lnu.se:20080/calendar/')
    .then(function (html) {
      const $ = cheerio.load(html)
      const paulLink = $('a')
      paulLink.each(function () {
        const sub = 'paul'
        if ($(this).attr('href').includes(sub)) {
          // console.log($(this).attr('href'))
          const paul = $(this).attr('href')
          rp('http://vhost3.lnu.se:20080/calendar/' + paul)
            .then(function (html) {
              const $ = cheerio.load(html)
              const days = $('th').text()
              const available = $('td').text().toLowerCase()
              const dayArr = [days.split('day', 3)]
              const availableArr = [available.match(/.{1,2}/g)]
              const freeDay = []

              if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'ok') {
                freeDay.push(dayArr[0][0])
              }
              if (dayArr[0][1] === 'Satur' && availableArr[0][1] === 'ok') {
                freeDay.push(dayArr[0][1])
              }
              if (dayArr[0][2] === 'Sun' && availableArr[0][2] === 'ok') {
                freeDay.push(dayArr[0][2])
              }
              return freeDay
            })
        }
      })
    })
}
paul()

const peter = function (calendar) {
  rp('http://vhost3.lnu.se:20080/calendar/')
    .then(function (html) {
      const $ = cheerio.load(html)
      const peterLink = $('a')
      peterLink.each(function () {
        const sub = 'peter'
        if ($(this).attr('href').includes(sub)) {
          const peter = $(this).attr('href')
          rp('http://vhost3.lnu.se:20080/calendar/' + peter)
            .then(function (html) {
              const $ = cheerio.load(html)
              const days = $('th').text()
              const available = $('td').text().toLowerCase()
              const dayArr = [days.split('day', 3)]
              const availableArr = [available.match(/.{1,2}/g)]
              const freeDay = []

              if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'ok') {
                freeDay.push(dayArr[0][0])
              }
              if (dayArr[0][1] === 'Satur' && availableArr[0][1] === 'ok') {
                freeDay.push(dayArr[0][1])
              }
              if (dayArr[0][2] === 'Sun' && availableArr[0][2] === 'ok') {
                freeDay.push(dayArr[0][2])
              }
              return freeDay
            })
        }
      })
    })
}
peter()

const mary = function (calendar) {
  rp('http://vhost3.lnu.se:20080/calendar/')
    .then(function (html) {
      const $ = cheerio.load(html)
      const maryLink = $('a')
      maryLink.each(function () {
        const sub = 'mary'
        if ($(this).attr('href').includes(sub)) {
          const mary = $(this).attr('href')
          rp('http://vhost3.lnu.se:20080/calendar/' + mary)
            .then(function (html) {
              const $ = cheerio.load(html)
              const days = $('th').text()
              const available = $('td').text().toLowerCase()
              const dayArr = [days.split('day', 3)]
              const availableArr = [available.match(/.{1,2}/g)]
              const freeDay = []

              if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'ok') {
                freeDay.push(dayArr[0][0])
              }
              if (dayArr[0][1] === 'Satur' && availableArr[0][1] === 'ok') {
                freeDay.push(dayArr[0][1])
              }
              if (dayArr[0][2] === 'Sun' && availableArr[0][2] === 'ok') {
                freeDay.push(dayArr[0][2])
              }
              return freeDay
            })
        }
      })
    })
}
console.log(mary('http://vhost3.lnu.se:20080/calendar/' + mary))
*/
/*
function calendarLinks (link) {
  // Setting URL and headers for request
  var options = {
    url: link,
    headers: {
      'User-Agent': 'request'
    }
  }
  // Return new promise
  return new Promise(function (resolve, reject) {
    // Do async job
    request.get(options, function (err, resp, body) {
      if (err) {
        reject(err)
      } else {
        const $ = cheerio.load(body)
        const allLinks = $('a')
        allLinks.each(function () {
          if ($(this).attr('href').substr(27, 38) === 'calendar/') {
            const calendar = $(this).attr('href')
            // console.log(calendar, 'calendar bitch')
            return calendar
          }
        })
      }
    })
  })
}
*/

/*
function paul () {
  var options = {
    url: calendarLinks(),
    headers: {
      'User-Agent': 'request'
    }
  }
  // Return new promise
  return new Promise(function (resolve, reject) {
    // Do async job
    request.get(options, function (err, resp, body) {
      if (err) {
        reject(err)
      } else {
        const $ = cheerio.load(body)
        const allLinks = $('a')
        allLinks.each(function () {
          if ($(this).attr('href').substr(27, 38) === 'calendar/') {
            const calendar = $(this).attr('href')
            // console.log(calendar, 'calendar bitch')
            return calendar
          }
        })
      }
    })
  })
}
*/
/*
function calendarLinks (link) {
  request(link, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html)
      const allLinks = $('a')
      allLinks.each(function () {
        if ($(this).attr('href').substr(27, 38) === 'calendar/') {
          const calendar = $(this).attr('href')

          return calendar
          // return peter(calendar)
          // return mary(calendar)
        }
      })
    }
  })
}
*/

/*
function paul () {
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
              const available = $('td').text().toLowerCase()
              const dayArr = [days.split('day', 3)]
              const availableArr = [available.match(/.{1,2}/g)]
              const freeDay = []

              if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'ok') {
                freeDay.push(dayArr[0][0])
              }
              if (dayArr[0][1] === 'Satur' && availableArr[0][1] === 'ok') {
                freeDay.push(dayArr[0][1])
              }
              if (dayArr[0][2] === 'Sun' && availableArr[0][2] === 'ok') {
                freeDay.push(dayArr[0][2])
              }
              return freeDay
            }
          })
        }
      })
    }
  })
}
*/

/*
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
              const available = $('td').text().toLowerCase()
              const dayArr = [days.split('day', 3)]
              const availableArr = [available.match(/.{1,2}/g)]
              const freeDay = []

              if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'ok') {
                freeDay.push(dayArr[0][0])
              }

              if (dayArr[0][1] === 'Satur' && availableArr[0][1] === 'ok') {
                freeDay.push(dayArr[0][1])
              }

              if (dayArr[0][2] === 'Sun' && availableArr[0][2] === 'ok') {
                freeDay.push(dayArr[0][2])
              }
              return freeDay
            }
          })
        }
      })
    }
  })
}

function mary (calendarLinks) {
  request(calendarLinks, (error, response, html) => {
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
              const available = $('td').text().toLowerCase()
              const dayArr = [days.split('day', 3)]
              const availableArr = [available.match(/.{1,2}/g)]
              const freeDay = []

              if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'ok') {
                freeDay.push(dayArr[0][0])
              }

              if (dayArr[0][1] === 'Satur' && availableArr[0][1] === 'ok') {
                freeDay.push(dayArr[0][1])
              }

              if (dayArr[0][2] === 'Sun' && availableArr[0][2] === 'ok') {
                freeDay.push(dayArr[0][2])
              }
              return freeDay
            }
          })
        }
      })
    }
  })
}

console.log(paul(calendarLinks))
/*
function availableDays (freeDay) {
  console.log(paul(freeDay))
}

availableDays()
*/
module.exports = { availableDays }
