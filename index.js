//Backend
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.statusCode = 200
  res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})
