const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Player = require('../models/Player')
const Feed = require('../models/NewsFeed')


router.get('/', (req, res) => {
    console.log('get router!')
    res.send('<h2>Get page</h2>')
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    await User.findOne({
        name: username
    })
        .then(async user => {
            if (user !== null) {
                console.log(user)
                const comparePasswords = await bcrypt.compare(password, user.password)
                if (comparePasswords) {
                    console.log('The passwords are same!', comparePasswords)
                    const token = jwt.sign({
                        name: user.name,
                        password: user.password,
                        authorId: user._id,
                        isAdmin: user.roles['admin']
                    }, 'secretToken')
                    res.cookie('userToken', token)
                    res.send(JSON.stringify({
                        success: true,
                        user: user.name,
                        roles: user.roles,
                        message: 'the user was  found'
                    }))
                } else {
                    console.log('The passwords are not the same!', comparePasswords)
                    res.send(JSON.stringify({ success: false, message: 'the passwords do not match!' }))
                }
                return
            }
            console.log(user)
            res.send(JSON.stringify({ success: false, message: 'the user was not found' }))
        })
        .catch(err => {
            console.log('error with finding the user!', err)
        })

})

router.post('/register', async (req, res) => {
    const userFound = await User.findOne({ name: req.body.username })
        .then(async user => {
            console.log('Found user ', user)
            if (user !== null) {
                res.send(JSON.stringify('The user already exists!'))
                return
            } else {
                // res.send(JSON.stringify('The user is ready for reg'))
                const salt = await bcrypt.genSalt(10)

                console.log(req.body.password)
                const hashedPassword = await bcrypt.hash(req.body.password, salt)

                console.log(salt)
                await User.create({
                    name: req.body.username,
                    password: hashedPassword
                })
                    .then(user => {
                        console.log('The user was created!')

                        const token = jwt.sign({
                            name: user.name,
                            password: hashedPassword,
                            authorId: user._id,
                            roles: user.roles
                        }, 'secretToken')
                        res.cookie('userToken', token)
                        res.send(JSON.stringify({ isAdmin: user.roles['admin'] }))
                    })
                    .catch(err => {
                        console.log('error with the creation!', err)
                    })
            }
        })
        .catch(err => {
            console.log('error with the creation!', err)
        })
})

router.post('/create-player', async (req, res) => {
    const { name, position, number, nationality } = req.body

    await Player.create({
        name, position, number, nationality
    })
        .then(data => {
            console.log(`The player was created: ${data}`)
            res.cookie('playerblabla', 'Henry')
            res.send(JSON.stringify(`The player was created: ${data}`))
        })
        .catch(err => {
            console.log(err)
        })

})

router.get('/squad', async (req, res) => {
    await Player.find()
        .then(players => {
            res.send(JSON.stringify(players))
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/news', async(req, res) => {
    await Feed.find()
        .then(news => {
            res.send(JSON.stringify(news))
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/add-news', async (req, res) => {
    const { title, description, authorId } = req.body
    const feed = await new Feed({ title, description, authorId })
    feed
        .save()
        .then(data => {
            res.send(JSON.stringify({ title, description, authorId, _id: data._id }))
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/news/:id', async (req, res) => {
    const id = req.params.id
    await Feed.findById(id)
    .then(data => {
        console.log('data found:')
        console.log(data)
        res.send(JSON.stringify(data))
    })
    .catch(err => {
        console.log(err)
    })
})

router.patch('/news/:id', async(req, res) => {
    console.log('Patching...')
    const id = req.params.id
    const { description } = req.body
    console.log(description)
    await Feed.findByIdAndUpdate({ _id: id}, {description})
    .then(data => {
        console.log('Successfully patched!')
        res.send(JSON.stringify(data))
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router