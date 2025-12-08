const path = require('path')
const menuRouter = require('express').Router()
const { getCollection } = require('../../../dbconnect')

//gett all menu items
menuRouter.get('/', async (req, res) => {
    const collection = await getCollection('FoodTruck', 'Menu')
    const found = await collection.find({}).toArray()
    res.send(found)    
})

//add a new menu item
menuRouter.post('/add', async (req, res) => {
    const { number, description, name, price, image } = req.body
    const collection = await getCollection('FoodTruck', 'Menu')
    const { acknowledged, insertedId } = await collection.insertOne({ number, description, name, price, image })
    res.send({ acknowledged, insertedId })
})

//get menu item by number
menuRouter.get('/:number', async (req, res) => {
    const { number } = req.params    
    const collection = await getCollection('FoodTruck', 'Menu')
    const found = await collection.findOne({ number: parseInt(number) })
    if(found) res.json(found)
     else res.send({error: `Menu item not found: ${number}`})
})



module.exports = menuRouter