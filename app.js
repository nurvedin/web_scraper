// const request = require('request')
// const cheerio = require('cheerio')
// const links = require('./lib/links.js')
// const rp = require('request-promise')

// const link = 'http://vhost3.lnu.se:20080/weekend'
const scrape = require('./lib/calendarLinks.js')
const movieSearch = require('./lib/movie.js')
const dinnerSearch = require('./lib/dinner.js')

scrape.availableDays().then(function (link) {
  process.stdout.write('Scraping links')
}).then(function () {
  process.stdout.write('.')
}).then(function () {
  process.stdout.write('.')
}).then(function () {
  process.stdout.write('.')
}).then(function () {
  process.stdout.write('.')
}).then(function () {
  process.stdout.write('OK!')

  movieSearch.cinemaLink().then(function () {
    process.stdout.write('Scraping showtimes')
  }).then(function () {
    process.stdout.write('.')
  }).then(function () {
    process.stdout.write('.')
    console.log('\n')
  }).catch(function (err) {
    console.log(err)
  })
  
}).catch(function (err) {
  console.log(err)
})



dinnerSearch.dinnerLink().then(function () {
  process.stdout.write('Scraping dinnertimes')
}).catch(function (err) {
  console.log(err)
})
