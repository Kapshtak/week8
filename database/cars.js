'use strict'
const fs = require('fs')
const filePath = 'database/cars.json'

async function readStorage(storageFile){
  try{
      const data = await fs.promises.readFile(storageFile,'utf8');
      return JSON.parse(data);
  }
  catch(err){
      console.log(err)
      return [];
  }
}

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

async function findCar(licence){
  const library = await(readStorage(filePath));
  return new Promise(resolve=>{
    for (let car of library) {
      if (car.licence == licence.toUpperCase()) {
      }
        resolve(car)}
      resolve({ error: 'Not found' });
  });  
}

function getDiscountedPrice(obj) {
  switch (true) {
    case obj.price > 20000:
      return [obj.price * 0.75, '25%']
    case obj.price < 5000:
      return [obj.price * 0.9, '10%']
    case (obj.price >= 5000 || obj.price <= 20000):
      return [obj.price * 0.85, '15%']
  }
}

module.exports = {
  getAllCars,
  addCar,
  findCar,
  getDiscountedPrice
}
