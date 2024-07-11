const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./db')
const CardMenu = require('./routes/CardMenu.js')
const PersoN = require('./routes/Person.js')

app.use('/menu', CardMenu)
app.use('/person', PersoN)

// ------------------------------------------------------->

app.get('/', (req, res)=>{
    res. send('welcome to home page: ')
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('server is running: ')
})