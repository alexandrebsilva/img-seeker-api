var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const ImageSchema = new Schema({
    contentType: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    path: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Image', ImageSchema)