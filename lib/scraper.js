//  http://vhost3.lnu.se:20080/weekend
// const request = require('request')

// request('http://vhost3.lnu.se:20080/weekend', (error, response, html) => {
//  if (!error && response.statusCode === 200) {
//    console.log(html)
//  }
// })
// export function getWebsite () {
//  const url = 'http://vhost3.lnu.se:20080/weekend'
//  const getWebsite = async (url) => {
//    const response = await window.fetch(url)
//    const data = await response.json()
//    console.log(data)
//  }

//  getWebsite()
// }

// const getWebsite = async (url) => {
//  const response = await window.fetch(url)
//  const data = await response.json()
//  return data
// }
// const url = getWebsite(' http://vhost3.lnu.se:20080/weekend')

// const getWebsite = async (url) => {
//  const response = await window.fetch('http://vhost3.lnu.se:20080/weekend')
//  const myJson = await response.text()
//  console.log(myJson)
// }
const request = require('request')
const url = 'http://vhost3.lnu.se:20080/weekend'
const getWebsite = new Promise((resolve, reject) => {
  request(url, (error, response, body) => {
    if (error) {
      reject(error)
    } else if (response.statusCode === 200) {
      resolve(body)
    }
  })
})

module.exports = { getWebsite }
