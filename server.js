'use strict'
const http = require('http')
const port = 8000
const host = 'localhost'
const { getAllCars, addCar, findCar, getDiscountedPrice } = require('./database/cars')

const server= http.createServer(async (request,response)=>{
  const { pathname, searchParams } = new URL(
    `http://${request.headers.host}${request.url}`
  )
  const route = decodeURIComponent(pathname)
  if (route === '/get-cars') {
    const cars = getAllCars()
    for (const car of cars) {
      [car['discountedPrice'], car['discount']] = getDiscountedPrice(car)
    }
    sendJSON(response, cars, 200)
  } else if (route === '/create-car') {
    const car = {
      licence: searchParams.get('licence'),
      maker: searchParams.get('maker'),
      model: searchParams.get('model'),
      owner: searchParams.get('owner'),
      price: searchParams.get('price'),
      color: searchParams.get('color'),
    }
    addCar(car)
    sendJSON(response, car, 201)
  } else if (route === '/find-car') {
    const car = await findCar(searchParams.get('licence'))
    car['discountedPrice'] = getDiscountedPrice(car)[0]
    car['discount'] = getDiscountedPrice(car)[1]
    sendJSON(response, car, 200)
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
