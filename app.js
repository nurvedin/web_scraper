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
              const freeDay = []
              const $ = cheerio.load(html)
              const weekendDays = $('th').text()
              const availableDays = $('td').text()
              const dayArr = [weekendDays.split('day', 3)]
              const availableArr = [availableDays.match(/.{1,2}/g)]

              if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'ok') {
                counter++
                freeDay.push(dayArr[0][0])
              } else if (dayArr[0][0] === 'Fri' && availableArr[0][0] === 'OK') {
                counter++
                freeDay.push(dayArr[0][0])
              } else if (dayArr[1][1] === 'Satur' && availableArr[1][1] === 'ok') {
                counter++
                freeDay.push(dayArr[1][1])
              } else if (dayArr[1][1] === 'Satur' && availableArr[1][1] === 'OK') {
                counter++
                freeDay.push(dayArr[1][1])
              } else if (dayArr[2][2] === 'Sun' && availableArr[2][2] === 'ok') {
                counter++
                freeDay.push(dayArr[2][2])
              } else if (dayArr[2][2] === 'Sun' && availableArr[2][2] === 'OK') {
                counter++
                freeDay.push(dayArr[2][2])
              } else {
                console.log('There is no day that works for everybody')
              }
              if (counter === 1) {
                // console.log('Friday')
              }
            }
          })
        })
      }
    })
  }
})

request(rootLink, (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const linkArr = []
    const $ = cheerio.load(html)
    const links = $('a')
    links.each(function () {
      const allLinks = $(this).attr('href')
      linkArr.push(allLinks)
    })
    // const cinema = linkArr[1]
    const firstMovie = 'http://vhost3.lnu.se:20080/cinema/check?day=05&movie=01'
    const secondMovie = 'http://vhost3.lnu.se:20080/cinema/check?day=05&movie=02'
    const thirdMovie = 'http://vhost3.lnu.se:20080/cinema/check?day=05&movie=03'
    const time = []
    request(firstMovie, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = JSON.parse(html)
        for (let i = 0; i < $.length; i++) {
          var objectArr = $[i]
          if (objectArr.status === 1) {
            time.push('First movie ' + objectArr.time)
          }
        }
      }
    })
    request(secondMovie, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = JSON.parse(html)
        for (let i = 0; i < $.length; i++) {
          var objectArr = $[i]
          if (objectArr.status === 1) {
            time.push('Second Movie ' + objectArr.time)
          }
        }
      }
    })
    request(thirdMovie, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = JSON.parse(html)
        for (let i = 0; i < $.length; i++) {
          var objectArr = $[i]
          if (objectArr.status === 1) {
            time.push('Third movie ' + objectArr.time)
            // console.log(time)
          }
        }
      }
    })
  }
})

request(rootLink, (error, response, html) => {
  const linkArr = []
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html)
    const links = $('a')
    links.each(function () {
      const allLinks = $(this).attr('href')
      linkArr.push(allLinks)
    })
  }
  const dinnerUrl = linkArr[2] + '/'
  console.log(dinnerUrl)

  const jsonData = {
    username: 'zeke',
    password: 'coys',
    submit: 'login'
  }

  // request.post({
  //  url: dinnerUrl,
  //  json: jsonData
  // }, function (error, response, html) {
  //  if (!error && response.statusCode === 302) {
  // const $ = cheerio.load(html)
  //    const cookie = response.headers['set-cookie']
  //    console.log(cookie)
  // const $ = cheerio.load(html)
  // console.log($)
  //  }
  // })

  function getCookies (callback) {
    request.post({
      url: dinnerUrl + '/login',
      json: jsonData
    }, function (error, response, body) {
      if (!error && response.statusCode === 302) {
        const cookie = response.headers['set-cookie']
        const location = response.headers.location
        console.log(location)
        return callback(null, cookie, location)
      } else {
        return callback(error)
      }
    })
  }

  function getLocation (callback) {
    request.post({
      url: dinnerUrl + '/login',
      json: jsonData
    }, function (error, response, body) {
      if (!error && response.statusCode === 302) {
        const location = response.headers.location
        return callback(null, location)
      } else {
        return callback(error)
      }
    })
  }

  getLocation(function (err, res) {
    if (!err) {
      console.log(res)
    }
  })

  request({
    url: dinnerUrl,
    headers: getCookies,
    getLocation
  }, function (error, response, html) {
    console.log(response.statusCode)
    if (!error && response.statusCode === 200) {
      console.log(html) // this console.logs my login page since requests w/o valid cookies get redirected to login
    }
  })
})
