const getImageUrls = require('get-image-urls');
const { saveImage } = require('../repositories/imageRepository');
//const url = 'https://suittech.com.br'
//const url = 'https://i.picsum.photos/id/183/200/300.jpg?hmac=Z9yCtuuIPn5CuOhwIntNEQFIRotghuBn06nqOSL828c'

module.exports = {
    async getImages(url) {
        return getImageUrls(url)
    },
    async saveImage(img) {
        try {
            saveImage(img)
            return { success: true }
        } catch (error) {
            console.log(error)
            throw new Error('erro ao salvar')
        }
        return
    }
}