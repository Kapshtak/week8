'use strict'
const carsLibrary = require('./cars.json')
const http = require('http')
const port = 8000
const host = 'localhost'
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

const server = http.createServer((request, response) => {
  const { pathname, searchParams } = new URL(
    `http://${request.headers.host}${request.url}`
  )
  const route = decodeURIComponent(pathname)
  if (route === '/create-car') {
    const licence = searchParams.get('licence')
    const maker = searchParams.get('maker')
    const model = searchParams.get('model')
    const owner = searchParams.get('owner')
    const price = searchParams.get('price')
    const color = searchParams.get('color')
    const car = new Car(licence, maker, model, owner, price, color)
    const carObj = car.getCar()
    writeCar(carObj)
    sendJSON(response, carObj)
  } else if (route === '/get-cars') {
    fs.readFile(filePath, 'utf8', (err, contents) => {
      if (err) {
        sendJSON(response, { error: 'Not found' }, 404)
      }
      try {
        const jsonString = JSON.parse(contents)
        sendJSON(response, jsonString, 200)
      } catch (jsonError) {
        console.error('Error parsing JSON')
      }
    })
  } else if (route === '/find-car') {
    const licence = searchParams.get('licence')
    fs.readFile(filePath, 'utf8', (err, contents) => {
      if (err) {
        sendJSON(response, { error: 'Not found' }, 404)
      }
      try {
        const jsonString = JSON.parse(contents)
        for (const car of jsonString) {
          if (car.licence == licence) {
            sendJSON(response, car, 200)
          } 
        }
      } catch (jsonError) {
        console.error('Error parsing JSON')
      }
    })
  } else {
    sendJSON(response, { error: 'Not found' }, 404)
  }
})

server.listen(port, host, () =>
  console.log(`Carserver serving at ${host}:${port}`)
)

function sendJSON(response, data, status = 200) {
  const jsonData = JSON.stringify(data)
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
  response.end(jsonData)
}
