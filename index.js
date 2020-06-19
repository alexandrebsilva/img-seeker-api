const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const ImageService = require('./src/services/ImageService')
const dotenv = require('dotenv')
const result = dotenv.config()

const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@imgseekercluster-iytdz.mongodb.net/imgsDB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

const PORT = 4000

const app = express()

const server = http.createServer(app)

//create the socket using the service instance
const io = socketIO(server)

//when user connects
io.on('connection', socket => {
    console.log('New user connected.')

    //this point can be improved for a better performance and experience
    const listImages = async () => {
        console.log('consulting images')
        const images = await ImageService.listAllImages()
        io.sockets.emit('listImages', { images, loading: false })
    }
    listImages()

    const requestImagesFromUrl = async (url) => {
        const imgsData = await ImageService.getImages(url)
        if (imgsData === []) {
            io.sockets.emit('urlEventSubmit', { loading: false })
        } else {
            io.sockets.emit('urlEventSubmit', { data: imgsData, loading: false })
        }
    }

    //when user interacts with the socket/event
    socket.on('urlEventSubmit', (url) => {
        console.log(`URL received: ${url}`)
        io.sockets.emit('urlEventSubmit', { loading: true })

        requestImagesFromUrl(url)
    })

    //when user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})


server.listen(PORT, () => console.log(`Listening server on port ${PORT}`))