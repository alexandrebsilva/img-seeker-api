const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const ImgService = require('./src/services/ImgService')

const mongoose = require('mongoose');
const ImageRepository = require('./src/repositories/imageRepository')
const getUnique = require('./src/utils/removeDuplicate')


mongoose.connect('mongodb+srv://imgSeeker:imgSeeker@imgseekercluster-iytdz.mongodb.net/imgsDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });


const PORT = 4000

const app = express()

const server = http.createServer(app)

//create the socket using the service instance
const io = socketIO(server)

io.on('connection', socket => {
    console.log('New user connected.')

    socket.on('urlEventSubmit', (url) => {
        console.log(`URL received: ${url}`)
        io.sockets.emit('urlEventSubmit', { loading: true })
        /* 
        const data = { imgDetail: imgsData, url }
                    saveImages(data)
                        .then((resp) => {
                            console.log(resp)
                        })
                        .catch((e) => { console.log(e) })*/

        ImgService.getImages(url)
            .then((imgsData) => {
                io.sockets.emit('urlEventSubmit', { data: imgsData, loading: false })
            })
            .catch((e) => {
                console.log(e)
            })
        //getImages(url).then((imgsData) => {
        //    //const data = getUnique(imgsData, imgsData.url)
        //    io.sockets.emit('urlEventSubmit', { data: imgsData, loading: false })
        //}).catch((e) => {
        //    console.log('Algo deu errado')
        //    console.log(e)
        //})

    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})


server.listen(PORT, () => console.log(`Listening server on port ${PORT}`))