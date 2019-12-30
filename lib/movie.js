const axios = require('axios')
const cheerio = require('cheerio')
const link = 'http://vhost3.lnu.se:20080/weekend'

const getLinks = async () => {
  const html = await axios.get(link)
  const $ = cheerio.load(html.data)
  return $('li a').attr('href')
}

const cinemaLink = async () => {
  const calendar = await getLinks()
  const html = await axios.get(calendar)
  const $ = cheerio.load(html.data)
  var urls = []
  $('li a').each((i, elem) => {
    urls[i] = $(elem).attr('href')
  })
  console.log(urls)
  return urls
}
module.exports = { cinemaLink }
