require('dotenv').config()

const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
// const port = 5000

app.use(cors())
app.use(express.json())

// Available Routes 
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

app.get('/', function (req, res) {
  res.send('Hello BaluPal')
})

app.listen(process.env.REACT_APP_BACKEND_PORT,()=>{
    console.log(`iNotebook App listening at http://localhost:${process.env.REACT_APP_BACKEND_PORT}`)
})