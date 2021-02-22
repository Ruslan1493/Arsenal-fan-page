const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const runDatabase = require('./database')
const cookieParser = require('cookie-parser')

const app = express()
runDatabase(app)

app.use(bodyParser.json())
app.use(cookieParser())

app.use(function (req, res, next) {
    const data = req.cookies
    console.log('Cookies: ', data)
    next()
})

app.use(function (req, res, next) {
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/', require('./controllers/routes'))
