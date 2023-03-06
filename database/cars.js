'use strict'
const fs = require('fs')
const path = require('path')
const filePath = 'database/cars.json'

function getAllCars() {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8', 'r'))
  } catch (err) {
    console.error(err)
  }
}

function addCar(obj) {
  try {
    const JsonString = JSON.parse(fs.readFileSync(filePath, 'utf-8', 'r+'))
    JsonString.push(obj)
    fs.writeFileSync(filePath, JSON.stringify(JsonString), 'utf-8')
  } catch (err) {
    console.error(err)
  }
}

function findCar(licence) {
  try {
    const JsonString = JSON.parse(fs.readFileSync(filePath, 'utf-8', 'r'))
    for (const car of JsonString) {
      if (car.licence == licence.toUpperCase()) {
        return car
      }
    }
    return { message: 'car not found' }
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  getAllCars,
  addCar,
  findCar
}
