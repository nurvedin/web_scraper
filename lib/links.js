const request = require('request')
const cheerio = require('cherrio')

const links = () => {
  request(link, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html)
      // console.log($.html())
      const calendarLinks = $('a')
      // const paul = $(this).attr('href')
      // console.log(calendarLinks.text())
      // const linksArr = []
      calendarLinks.each(function () {
        const links = $(this).attr('href')
        console.log(links)
        return 'Hello from myFunctions (links) module'
      })
    }
  })
}

module.exports = { links }
