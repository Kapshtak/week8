'use strict'

const http = require('http')
const port = 8000
const host = 'localhost'
const { Car, writeCar, findCar } = require('./cars.js')

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
  } else if (route === '/get-car') {
    const licence = searchParams.get('licence')
    const data = findCar(licence)
    sendJSON(response, data)
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
