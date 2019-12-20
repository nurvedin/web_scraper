const request = require('request')
const cheerio = require('cheerio')

const Links = (link) => {
  request(link, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html)
      const allLinks = $('a')
      console.log('Scraping links...')
      allLinks.each(function () {
        // console.log($(this).attr('href'))
        if ($(this).attr('href').substr(27, 38) === 'calendar/') {
          const calendar = $(this).attr('href')
          console.log(calendar)
          return calendar
        } else if ($(this).attr('href').substr(27, 38) === 'cinema') {
          // const cinema = $(this).attr('href')
          // console.log('Cinema', cinema)
        } else if ($(this).attr('href').substr(27, 38) === 'dinner') {
          // const dinner = $(this).attr('href')
          // console.log('Resturant', dinner)
        }
      })
      console.log('OK!')
    }
  })
}

module.exports = Links
