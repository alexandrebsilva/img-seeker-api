//const mongoose = require('mongoose')
const Image = require('../models/Image')

class ImageRepository {
    async listImages() {
        return Image.aggregate([
            {
                $project: {
                    contentType: 1,
                    url: 1,
                    path: 1,
                    createdAt: 1,
                    domain: 1
                }
            },
            {
                $group: {
                    _id: '$domain',
                    images: { $push: { url: '$url', path: '$path' } }
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])
    }
    async domainAlreadUsed(domain) {
        const resp = await Image.find({ domain })
        if (resp === []) {
            return false
        }
        return true
    }

    async deleteDomain(domain) {
        const resp = await Image.deleteMany({ domain })
    }

    async saveImage(image) {
        const alreadyUsed = await this.domainAlreadUsed(image.domain)
        //verifies if domain has been already in the database
        //if so , it deletes and update
        if (alreadyUsed) {
            const resDelete = await this.deleteDomain(image.domain)
            const res = await Image.create(image)
            return
        } else {
            const res = await Image.create(image)
        }

        return res
    }
}
module.exports = new ImageRepository