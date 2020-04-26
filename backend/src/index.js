const express = require('express');
const socketIo = require('socket.io');
//const uuid = require('uuid/v4');
const router = express.Router();
//const { addUser } = require('./users.js');
const { join, remove } = require('./rooms');

const PORT = 4000;

router.get('/', (req, res) => {
    res.send('server is running');
});

const app = express();
const server = require('http').createServer(app);
const io = socketIo(server);


io.on('connection', (socket) => {
    console.log('new connection');

    socket.on('join', ({ name, roomId }, callback) => {

        const { error, room } = join(socket.id, name, roomId)
        if (error) return callback(error);

        socket.join(room.id, () => {
            console.log('socket joined room ' + roomId)
            io.to(room.id).emit('message',
                { room });
            callback();
        });
    });

    socket.on('disconnect', () => {
        const room = remove(socket.id);

        if (room && room.users && room.users.length > 0) {
            socket.broadcast.to(room.id).emit('message', {room});
        }

        //todo: remove room if no user exist

        console.log('user has disconnected!');
    });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
