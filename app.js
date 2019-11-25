const request = require('request')
const cheerio = require('cheerio')
const rootLink = 'http://vhost3.lnu.se:20080/weekend'
request(rootLink, (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html)
    const calendar = $('a')
    const link = calendar.attr('href')

    request(link, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html)
        const calendarLinks = $('a')
        calendarLinks.each(function () {
          const allLinks = $(this).attr('href')

          request(link + allLinks, (error, response, html) => {
            if (!error && response.statusCode === 200) {
              let counter = 0
              const $ = cheerio.load(html)
              const weekendDays = $('th').text()
              const availableDays = $('td').text()
              const dayArr = [weekendDays.split('day', 3)]
              const availableArr = [availableDays.match(/.{1,2}/g)]
              // console.log(dayArr[0][0])
              // console.log(availableArr[0][0])
              if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'ok') {
                counter++
              } else if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'OK') {
                counter++
              } else if (dayArr[1][1] === 'Satur' && availableArr[1][1] === 'ok') {
                counter++
              } else if (dayArr[1][1] === 'Satur' && availableArr[1][1] === 'OK') {
                counter++
              } else if (dayArr[2][2] === 'Sun' && availableArr[2][2] === 'ok') {
                counter++
              } else if (dayArr[2][2] === 'Sun' && availableArr[2][2] === 'OK') {
                counter++
              }
              if (counter === 1) {
                console.log('Friday works for everybody')
              }
            }
          })
        })
      }
    })
  }
})
