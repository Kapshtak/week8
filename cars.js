const carsLibrary = require('./cars.json')
const fs = require('fs')

const filePath = 'cars.json'

function readFile() {
  fs.readFile(filePath, 'utf8', (err, contents) => {
    if (err) {
      console.error(err)
      return
    }
    try {
      const jsonString = JSON.parse(contents)
      console.log(jsonString)
    } catch (jsonError) {
      console.error('Error parsing JSON')
    }
  })
}

function findCar(licence) {
  fs.readFile(filePath, 'utf8', (err, contents) => {
    if (err) {
      console.error(err)
      return
    }
    try {
      const jsonString = JSON.parse(contents)
      for (const car of jsonString) {
        if (car.licence == licence) {
          return car
        }
      }
      console.log('NO CAR')
    } catch (jsonError) {
      console.error('Error parsing JSON')
    }
  })
}

module.exports = {
  Car,
  writeCar,
  findCar
}
