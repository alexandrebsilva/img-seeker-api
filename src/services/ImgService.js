const getImageUrls = require('get-image-urls');
const ImageRepository = require('../repositories/imageRepository');

class ImgService {
    async getImages(url) {
        const images = await getImageUrls(url)
        console.table(images)
        const respMongo = await this.saveImages({ imgDetail: images, url })

        return images
    }

    async saveImages(data) {
        data.imgDetail.map((img) => {
            ImageRepository.saveImage({ contentType: img.contentType, url: img.url, domain: data.url, path: '' })
        })
    }

}


module.exports = new ImgService