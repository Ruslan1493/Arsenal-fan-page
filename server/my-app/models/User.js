const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        default: ['user']
    }
})

const userModel = mongoose.model('User', userSchema);

userModel.seedAdmin = async () => {
    await userModel.findOne({name: 'Admin'})
    .then(async data => {
        if(data){
            return
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash('Super@2020', salt)

        await userModel.create({
            name: 'Admin',
            password: hashedPass,
            roles: ['admin']
        })
        console.log('Admin created!')
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = userModel;