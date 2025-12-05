const path = require('path')
const menuRouter = require('express').Router()
const { getCollection } = require('../../../dbconnect')

//gett all menu items
menuRouter.get('/', async (req, res) => {
    const collection = await getCollection('FoodTruck', 'Menu')
    const menuItems = await collection.find({}).toArray()
     const item = menuItems.map(items => {
          const { number, description, name, price, image } = items
          return { number, description, name, price, image }
    })
    res.json(item)
})

//get menu item by number
menuRouter.get('/:number', async (req, res) => {
    const { number } = req.params    
    const collection = await getCollection('FoodTruck', 'Menu')
    const found = await collection.findOne({ number: parseInt(number) })
    if(found) res.json(found)
     else res.send({error: `Menu item not found: ${number}`})
})

//add a new menu item
menuRouter.post('/', async (req, res) => {
         
})

module.exports = menuRouter