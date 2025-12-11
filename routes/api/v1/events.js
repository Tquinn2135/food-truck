//Tom Quinn
const path = require('path')
const eventRouter = require('express').Router()
const { getCollection, ObjectId } = require('../../../dbconnect')

//get all events
eventRouter.get('/', async (req, res) => {
    const collection = await getCollection('FoodTruck', 'Events')
    const found = await collection.find({}).toArray()
    res.send(found)
})

//add a new event
eventRouter.post('/add', async (req, res) => {
    const { name, location, date, time } = req.body
    const collection = await getCollection('FoodTruck', 'Events')
    const { acknowledged } = await collection.insertOne({ name, location, date, time })
    res.send({ acknowledged })
})



//get event by eventID
eventRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const collection = await getCollection('FoodTruck', 'Events')
    const found = await collection.findOne({ _id: new ObjectId(id) })
    if (found) res.send(found)
        else res.send({error: {message: `event with id: ${id} not found`}})
})


module.exports = eventRouter