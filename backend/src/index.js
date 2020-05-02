const express = require('express');
const socketIo = require('socket.io');
//const uuid = require('uuid/v4');
const router = express.Router();
//const { addUser } = require('./users.js');
const { join, remove, setRoomName, setUserVote } = require('./rooms');

const PORT = 4000;

router.get('/', (req, res) => {
    res.send('server is running');
});

const app = express();
const server = require('http').createServer(app);
const io = socketIo(server);


io.on('connection', (socket) => {
    console.log('new connection');

    socket.on('join', ({ name, roomId, role }, callback) => {

        const { error, room } = join(socket.id, name, roomId, role)
        if (error) return callback({error});

        socket.join(room.id, () => {
            console.log('socket joined room ' + roomId)

            io.to(room.id).emit('message',
                { room });
            callback({userId: socket.id});
        });
    });

    socket.on('setRoomName', ({ roomId, name }) => {
        console.log(`room ${roomId} name set to ${name}`)
        const room = setRoomName(roomId, name);
        io.to(roomId).emit('message', { room });
    })

    socket.on('setVote', ({ roomId, userId,  vote }) => {
        const room = setUserVote(roomId, userId, vote);
        io.to(roomId).emit('message', { room });
    })


    // TODO: handle socket user events 'set user vote, set room title, show all votes, clear all votes' 

    socket.on('disconnect', () => {
        const room = remove(socket.id);

        if (room && room.users && room.users.length > 0) {
            socket.broadcast.to(room.id).emit('message', { room });
        }

        //todo: remove room if no user exist

        console.log('user has disconnected!');
    });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
