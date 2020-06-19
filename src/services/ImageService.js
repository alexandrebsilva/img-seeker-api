const getImageUrls = require('get-image-urls');
const getUnique = require('../utils/removeDuplicate')
const ImageRepository = require('../repositories/imageRepository');

class ImgService {
    async getImages(url) {
        let images = await getImageUrls(url)
        const uniqueObjs = getUnique(images, 'url')
        const respMongo = await this.saveImages({ imgDetail: uniqueObjs, url })

        return uniqueObjs
    }
    async listAllImages() {
        return ImageRepository.listImages()
    }
    async saveImages(data) {
        data.imgDetail.map((img) => {
            ImageRepository.saveImage({ contentType: img.contentType, url: img.url, domain: data.url, path: '' })
        })
    }

}


module.exports = new ImgService