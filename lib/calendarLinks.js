const cheerio = require('cheerio')
const axios = require('axios')
const args = process.argv.slice(2)[0]

const getLinks = async () => {
  const html = await axios.get(args)
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
  var daysArr = []
  paul.forEach(function () {
    $('th').each(function (dayIndex, day) {
      $('td').each(function (statusIndex, status) {
        if (dayIndex === statusIndex) {
          daysArr.push(($(day).text() + $(status).text()).toLowerCase())
        }
      })
    })
  })

  const freeDay = []
  if (daysArr[0] === 'fridayok') {
    freeDay.push('Fri')
  }
  if (daysArr[1] === 'saturdayok') {
    freeDay.push('Satur')
  }
  if (daysArr[2] === 'sundayok') {
    freeDay.push('Sun')
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
  var daysArr = []
  peter.forEach(function () {
    $('th').each(function (dayIndex, day) {
      $('td').each(function (statusIndex, status) {
        if (dayIndex === statusIndex) {
          daysArr.push(($(day).text() + $(status).text()).toLowerCase())
        }
      })
    })
  })

  const freeDay = []
  if (daysArr[0] === 'fridayok') {
    freeDay.push('Fri')
  }
  if (daysArr[1] === 'saturdayok') {
    freeDay.push('Satur')
  }
  if (daysArr[2] === 'sundayok') {
    freeDay.push('Sun')
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
  var daysArr = []
  mary.forEach(function () {
    $('th').each(function (dayIndex, day) {
      $('td').each(function (statusIndex, status) {
        if (dayIndex === statusIndex) {
          daysArr.push(($(day).text() + $(status).text()).toLowerCase())
        }
      })
    })
  })

  const freeDay = []

  if (daysArr[0] === 'fridayok') {
    freeDay.push('Fri')
  }
  if (daysArr[1] === 'saturdayok') {
    freeDay.push('Satur')
  }
  if (daysArr[2] === 'sundayok') {
    freeDay.push('Sun')
  }
  return freeDay
}

const availableDays = async () => {
  const pau = await paul()
  const pet = await peter()
  const mar = await mary()

  var dayOfDate = []
  let friCount = 0
  let saturCount = 0
  let sunCount = 0

  for (let i = 0; i < pau.length; i++) {
    if (pau[i] === 'Fri') {
      friCount++
    }
    if (pau[i] === 'Satur') {
      saturCount++
    }
    if (pau[i] === 'Sun') {
      sunCount++
    }
  }

  for (let i = 0; i < pet.length; i++) {
    if (pet[i] === 'Fri') {
      friCount++
    }
    if (pet[i] === 'Satur') {
      saturCount++
    }
    if (pet[i] === 'Sun') {
      sunCount++
    }
  }

  for (let i = 0; i < mar.length; i++) {
    if (mar[i] === 'Fri') {
      friCount++
    }
    if (mar[i] === 'Satur') {
      saturCount++
    }
    if (mar[i] === 'Sun') {
      sunCount++
    }
  }

  if (friCount === 3) {
    dayOfDate.push('friday')
  }
  if (saturCount === 3) {
    dayOfDate.push('saturday')
  }
  if (sunCount === 3) {
    dayOfDate.push('sunday')
  }
  return dayOfDate
}

module.exports = { availableDays }
