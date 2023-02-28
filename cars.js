const carsLibrary = require('./cars.json')
const fs = require('fs')

const filePath = 'cars.json'

class Car {
  constructor(licence, maker, model, owner, price, color) {
    this.licence = licence
    this.maker = maker
    this.model = model
    this.owner = owner
    this.price = price
    this.color = color
  }
  getCar() {
    return {
      licence: this.licence,
      maker: this.maker,
      model: this.model,
      owner: this.owner,
      price: this.price,
      color: this.color
    }
  }
}

function writeCar(obj) {
  carsLibrary.push(obj)
  const testJsonString = JSON.stringify(carsLibrary)
  fs.writeFile(filePath, testJsonString, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log('File written successfully')
    }
  })
}

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
          console.log(car)
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
