const path = require('path')
const eventRouter = require('express').Router()
const { getCollection } = require('../../../dbconnect')

//get all events
eventRouter.get('/', async (req, res) => {
    const collection = await getCollection('FoodTruck', 'Events')
    const found = await collection.find({}).toArray()
    res.send(found)
})

//get event by eventID
eventRouter.get('/:eventID', async (req, res) => {
    const { eventID } = req.params    
    const collection = await getCollection('FoodTruck', 'Events')
    const found = await collection.findOne({ eventID: parseInt(eventID) })
    if(found) res.json(found)
     else res.send({error: `Event not found: ${eventID}`})
})

//add a new event

module.exports = eventRouter