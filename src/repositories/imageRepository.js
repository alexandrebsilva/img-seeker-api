//const mongoose = require('mongoose')
const Image = require('../models/Image')

module.exports = {
    async readAllImages() {
        return Image.find()
    },

    async findImageById(_id) {
        return Image.find({ _id })
    },
    async saveImage(image) {
        const res = await Image.create(image)
        return res
    }

}