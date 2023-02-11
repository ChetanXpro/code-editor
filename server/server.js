const express = require('express')
const app = express()
const http = require('http')

const { Server } = require('socket.io')


const server = http.createServer(app)

const io = new Server(server)


const users = {}
io.on('connection', (socket) => {
    console.log('Socket connected', socket.id)

    socket.on('join', ({ roomId, username }) => {
        console.log(roomId)

        users[socket.id] = username
    })
})





const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log('Server running'))



