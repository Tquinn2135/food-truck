const path = require('path')
const menuRouter = require('express').Router()
const { getCollection } = require('../../../dbconnect')

//gett all menu items
menuRouter.get('/api/v1/menu', async (req, res) => {
    const collection = await getCollection('FoodTruck', 'Menu')
    const menuItems = await collection.find({}).toArray()
     const item = menuItems.map(items => {
          const { number, description, name, price, image } = items
          return { number, description, name, price, image }
    })
    res.json(item)
})

//get menu item by number
menuRouter.get('/api/v1/menu/:number', async (req, res) => {
    const { number } = req.params    
    const collection = await getCollection('FoodTruck', 'Menu')
    const menuItem = await collection.findOne({ number: parseInt(number) })
    res.json(menuItem)
})

//add a new menu item
menuRouter.post('/menu', async (req, res) => {
         
})

module.exports = menuRouter