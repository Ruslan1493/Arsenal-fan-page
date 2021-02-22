const mongoose = require('mongoose') 

const feedSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    }
})

const FeedModel = mongoose.model('NewsFeed', feedSchema)

module.exports = FeedModel