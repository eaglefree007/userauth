const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// const jwt = require('jsonwebtoken')
const {dbConnect} = require('./db/dbConnection')
dbConnect()
const PORT = 3000

const app = express()
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', require('./router/UserRouter'))


// app.get('/', (req, res) => {
//   console.log('ok')
//   res.send('ok')
// })

app.listen(PORT, () => {
  console.log(`app listen on ${PORT}`)
})