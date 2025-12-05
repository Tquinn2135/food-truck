const path = require('path')
const eventRouter = require('express').Router()
const { getCollection } = require('../../../dbconnect')

//get all events
eventRouter.get('/api/v1/events', async (req, res) => {
    const collection = await getCollection('FoodTruck', 'Events')
    const eventLocations = await collection.find({}).toArray()
    const events = eventLocations.map(event => {
        const { name, date, location, time } = event
        return { name, date, location, time }
    })
    res.json(events)
})

//get event by eventID
eventRouter.get('/api/v1/events/:eventID', async (req, res) => {
    const { eventID } = req.params    
    const collection = await getCollection('FoodTruck', 'Events')
    const found = await collection.findOne({ eventID: parseInt(eventID) })
    if(found) res.json(found)
     else res.send({error: `Event not found: ${eventID}`})
})

module.exports = eventRouter