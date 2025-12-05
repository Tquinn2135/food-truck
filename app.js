const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.use(express.static('public'))

app.use(require('./routes/api/v1/menu'))
app.use(require('./routes/api/v1/events'))

// app.get('/', (req, res) => {
//    res.sendFile('index.html', { root })
// })

app.listen(port, () => console.log(`http://localhost:${port}/`))
