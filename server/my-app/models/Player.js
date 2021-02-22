const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
        validate:
        {
            validator: function (v) {
                console.log('v:')
                console.log(v)
                return true
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
})

const validatorObj = {
    validator: function (v) {
        console.log('v:')
        console.log(v)
        return true
    },
    message: props => `${props.value} is not a valid phone number!`
}

const playerModel = mongoose.model('player', playerSchema)

module.exports = playerModel