const licence = document.getElementById('licence')
const maker = document.getElementById('maker')
const model = document.getElementById('model')
const owner = document.getElementById('owner')
const price = document.getElementById('price')
const color = document.getElementById('color')
const table = document.getElementById('all-cars')
const searchField = document.getElementById('search')
const submitButton = document.getElementById('submit')
const resetButton = document.getElementById('reset')
const searchButton = document.getElementById('find')
const result = document.getElementById('result')

async function createCar() {
  const url =
    `http://localhost:8000/create-car?licence=${licence.value}&maker=${maker.value}` +
    `&model=${model.value}&owner=${owner.value}&price=${price.value}&color=${color.value}`
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', url, false)
  xmlHttp.send(null)
  return xmlHttp.res
}

async function findCar() {
  const data = await fetch(
    `http://localhost:8000/find-car?licence=${searchField.value}`,
    { mode: 'cors' }
  )
  const jsonData = await data.json()
  if ('message' in jsonData) {
    result.textContent =
      'No cars have been found with this licence plate number'
  } else {
    result.textContent =
      `Licence plate: ${jsonData.licence}, ` +
      `Manufacturer: ${jsonData.maker}, Model: ${jsonData.model}, ` +
      `Owner: ${jsonData.owner}, Price: ${jsonData.price}, Color: ${jsonData.color}, ` +
      `Discounted price: ${jsonData.discountedPrice}, Discount: ${jsonData.discount}`
    jsonData.color
  }
}

function createCell(text) {
  const td = document.createElement('td')
  td.textContent = text
  return td
}

async function getAllCars() {
  const data = await fetch('http://localhost:8000/get-cars', { mode: 'cors' })
  const jsonData = await data.json()
  for (const car of jsonData) {
    const tr = document.createElement('tr')
    tr.appendChild(createCell(car.licence))
    tr.appendChild(createCell(car.maker))
    tr.appendChild(createCell(car.model))
    tr.appendChild(createCell(car.owner))
    tr.appendChild(createCell(car.price))
    tr.appendChild(createCell(car.color))
    table.appendChild(tr)
  }
}

getAllCars()
searchButton.addEventListener('click', findCar)
submitButton.addEventListener('click', createCar)
resetButton.addEventListener('click', function () {
  window.location.reload()
})
