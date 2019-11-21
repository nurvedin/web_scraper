// import getWebsite from './lib/Scraper.js'

// getWebsite()
// const request = require('./lib/Scraper.js')
// console.log(request)
// request('http://vhost3.lnu.se:20080/weekend', (error, response, html) => {
//  if (!error && response.statusCode === 200) {
//    console.log(html)
//  }
// })

// const funcModule = require('./lib/Scraper.js')
// console.log(funcModule)

// const Scraper = require('./lib/Scraper.js')
// const scraper = require('./lib/Scraper.js')
// console.log(scraper)
// const request = require('./lib/Scraper.js')
// console.log(request)
// request.then(function (result) {
//  console.log(result)
// })
// const url = 'http://vhost3.lnu.se:20080/weekend'

// Promise((resolve, reject) => {
//  request(url, (error, response, body) => {
//    if (error) {
//      reject(error)
//    }
//    else if (response.statusCode === 200) {
//      resolve(body)
//      console.log(body)
//    }
//  })
// })
/**
 *
 */
const request = require('request')
const cheerio = require('cheerio')
request('http://vhost3.lnu.se:20080/weekend', (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html)
    // console.log($)
    const calendar = $('a')
    // console.log(calendar.attr('href'))
    const link = calendar.attr('href')
    // console.log(link)

    request(link, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html)
        const calendarLinks = $('a')
        calendarLinks.each(function () {
          // const text = $(this).text()
          const links = $(this).attr('href')
          // console.log(text + ' ===========>>>> ' + links)

          request(link + links, (error, response, html) => {
            if (!error && response.statusCode === 200) {
              const $ = cheerio.load(html)
              // console.log($(this).text())
              // console.log($.html())
              const days = $('th')
              // console.log(days.text())
              // console.log(days.html())
              // const freeDays = $('td')
              days.each((i, elem) => {
                const temp = $(elem).text()
                console.log(temp)
                // const temp = days.text()
                // console.log(temp.split('day', 3))
              })
              // freeDays.each(function () {
              // console.log($(this).text())
              // })
              // console.log(days)
              // console.log(freeDays)
            }
          })
        })
      }
    })
  }
})
