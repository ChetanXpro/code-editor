const express = require('express')
const app = express()
const http = require('http')

const { Server } = require('socket.io')


const server = http.createServer(app)

const io = new Server(server)
const getAllClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(id => {

        return {
            id, username: users[id]
        }

    })
}

const users = {}
io.on('connection', (socket) => {
    
    socket.on('join', ({ roomId, username }) => {


        users[socket.id] = username

        socket.join(roomId)

        const client = getAllClients(roomId)
        console.log(client)
        client.forEach(({ socketId }) => {
            io.to(socketId).emit('joined', {
                client, username, socketId
            })
        })
    })

    socket.on('code_change', ({ roomId, code }) => {
        console.log('code', code)
        console.log(roomId)
        socket.in(roomId).emit('code_change', { code })
    })

    socket.on('disconnecting', () => {
        const room = [...socket.rooms];

        room.forEach(roomId => {
            socket.in(roomId).emit('disconnected', {
                socketId: socket.id,
                username: users[socket.id]
            })
        })

        delete users[socket.id];

        socket.leave()

    })
})





const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log('Server running'))



