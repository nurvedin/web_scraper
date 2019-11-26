const request = require('request')
const cheerio = require('cherrio')
const link = 'http://vhost3.lnu.se:20080/weekend'
const links = () => {
  request(link, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html)
      console.log($.html())
      const calendarLinks = $('a')
      calendarLinks.each(function () {
        const links = $(this).attr('href')
        console.log(links)
        console.log('Scraping links........OK')
      })
    }
  })
}

module.exports = { links }
