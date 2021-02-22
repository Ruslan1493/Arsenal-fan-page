//Set up default mongoose connection
const mongoose = require('mongoose')
const PORT = process.env.PORT || '8000'
const mongoDB = 'mongodb://localhost:27017/arsenal-database'
const User = require('./models/User')

module.exports = (app) => {
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

    //Get the default connection
    const db = mongoose.connection;
    db.on('error', (err) => {
        console.log('connection error ', err)
    })

    db.once('open', () => {
        app.listen(PORT, () => {
            User.seedAdmin()
            console.log('The server is running on port: ', PORT)
        })
    })
}