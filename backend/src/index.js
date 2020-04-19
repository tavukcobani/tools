const express = require('express');
const socketio = require('socket.io');

const router = express.Router();
const { addUser } = require('./users.js');


const PORT = 4000;

router.get('/', (req, res) => {
    res.send('server is running');
});

const app = express();
const server = require('http').createServer(app);
const io = socketio(server);


io.on('connection', (socket) => {
    console.log('new connection');

    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name: name, room: room});

        if(error) return callback(error);

        socket.broadcast.to(user.room).emit('message',
        {user:'admin', text: `${user.name}, has joined to room ${user.room}`})
        socket.join(user.room);

        callback();
    });

    socket.on('disconnect', () => {
        console.log('user has disconnected!');
    });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
