const scrape = require('./lib/calendarLinks.js')
const movieSearch = require('./lib/movie.js')
const dinnerSearch = require('./lib/dinner.js')

scrape.availableDays().then(function (args) {
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
  console.log('\n')
}).catch(function (err) {
  console.log(err)
})

movieSearch.cinemaLink().then(function () {
  process.stdout.write('Scraping showtimes')
}).then(function () {
  process.stdout.write('.')
}).then(function () {
  process.stdout.write('.')
}).then(function () {
  process.stdout.write('OK!')
  console.log('\n')
}).catch(function (err) {
  console.log(err)
})

dinnerSearch.dinnerLink().then(function () {
  process.stdout.write('Scraping dinnertimes')
}).then(function () {
  process.stdout.write('.')
}).then(function () {
  process.stdout.write('.')
}).then(function () {
  process.stdout.write('.')
}).then(function () {
  process.stdout.write('OK!')
  console.log('\n')
}).catch(function (err) {
  console.log(err)
})

console.log('\n')
console.log('\n')

const recommendations = async () => {
  const movieChoice = await movieSearch.cinemaLink()
  const dinnerTime = await dinnerSearch.dinnerLink()
  const option = []

  for (let i = 0; i < movieChoice.length; i++) {
    for (let j = 0; j < dinnerTime.length; j++) {
      const movTime = movieChoice[i].time.slice(0, 2)

      if (dinnerTime[j].startTime / 100 > movTime && movTime < dinnerTime[j].startTime / 100) {
        option.push({
          day: dinnerTime[j].day,
          movie: movieChoice[i].movie,
          movieTitle: movieChoice[i].movieTitle,
          startMovie: movieChoice[i].time,
          startDinner: dinnerTime[j].startTime / 100
        })
      }
    }
  }

  for (let i = 0; i < option.length; i++) {
    if (option[i].movie === '01') {
      option[i].movie = option[i].movieTitle
    } else if (option[i].movie === '02') {
      option[i].movie = option[i].movieTitle
    } else if (option[i].movie === '03') {
      option[i].movie = option[i].movieTitle
    }
  }

  console.log('Recommendations')
  console.log('===============')
  console.log('\n')

  const booking = []

  for (let i = 0; i < option.length; i++) {
    if (booking.length === 0) {
      booking.push(option[i])
    } else {
      for (let j = 0; j < booking.length; j++) {
        if (JSON.stringify(option[i]) === JSON.stringify(booking[j])) {
          break
        } else if (j + 1 === booking.length) {
          booking.push(option[i])
        }
      }
    }
  }

  for (let i = 0; i < booking.length; i++) {
    console.log('On', booking[i].day, 'the movie', booking[i].movieTitle, 'starts at', booking[i].startMovie, 'and there is a free table from', booking[i].startDinner)
  }
}

recommendations()
