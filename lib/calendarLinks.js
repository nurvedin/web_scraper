const cheerio = require('cheerio')
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

module.exports = { availableDays }
