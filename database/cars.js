/* eslint-disable no-undef */
'use strict'
const fs = require('fs')
const filePath = 'database/cars.json'

async function readStorage(storageFile) {
  try {
    const data = await fs.promises.readFile(storageFile, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.log(err)
    return []
  }
}

async function getAllCars() {
  const database = await readStorage(filePath)
  return new Promise((resolve) => {
    resolve(database)
  })
}

async function addCar(obj) {
  const database = await readStorage(filePath)
  const carStatus = await findCar(obj.licence)
  return new Promise((resolve) => {
    if ('error' in carStatus) {
      database.push(obj)
      fs.writeFileSync(filePath, JSON.stringify(database), 'utf-8')
      resolve(database)
    }
    resolve({ error: 'Car already exists' })
  })
}

async function findCar(licence) {
  const database = await readStorage(filePath)
  return new Promise((resolve) => {
    if (database.length === 0) {
      resolve({ error: 'Database is empty' })
    }
    for (let car of database) {
      if (car.licence == licence.toUpperCase()) {
        resolve(car)
      }
    }
    resolve({ error: 'Car not found' })
  })
}

function getDiscountedPrice(obj) {
  switch (true) {
  case obj.price > 20000:
    return [obj.price * 0.75, '25%']
  case obj.price < 5000:
    return [obj.price * 0.9, '10%']
  case obj.price >= 5000 || obj.price <= 20000:
    return [obj.price * 0.85, '15%']
  }
}

module.exports = {
  getAllCars,
  addCar,
  findCar,
  getDiscountedPrice
}
