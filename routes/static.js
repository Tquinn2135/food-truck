//Tom Quinn
const { error } = require('console')
const path = require('path')
const router = require('express').Router()

const root = path.join(__dirname,'..', 'public')

router.get('/', (req, res) => {
     res.sendFile('index.html', { root })
})

router.get('/menu', (req, res) => {
     res.sendFile('index.html', { root })
})

router.get('/events', (req, res) => {
     res.sendFile('index.html', { root })
})

//temporary route for event
// router.get('/event/:id', (req, res) => {
//      res.sendFile('index.html', { root })
// })

module.exports = router