const express = require('express');
const socketIo = require('socket.io');
const uuid = require('uuid/v4');
const router = express.Router();
const { addUser } = require('./users.js');


const PORT = 4000;

router.get('/', (req, res) => {
    res.send('server is running');
});

const app = express();
const server = require('http').createServer(app);
const io = socketIo(server);


io.on('connection', (socket) => {
    console.log('new connection');
    socket.on('newSession', ({name}, callback) => {
        console.log('Creating new session for user')
        const room = uuid();
        const {error, user} = addUser({id: socket.id, name: name, room: room});
        if(error) return callback(error);
        socket.join(user.room, ()=>{
            socket.emit('message',{
                sessionId:room
            })
            console.log('joining new user to the new room ', {user})
            callback();
        });
    });

    socket.on('join', ({name, room}, callback) => {

        const {error, user} = addUser({id: socket.id, name: name, room: room});

        if(error) return callback(error);

        socket.join(user.room, ()=>{
            console.log('user join room request: ', {user})
            socket.broadcast.to(user.room).emit('message',
            {user:'admin', text: `${user.name}, has joined to room ${user.room}`})
            callback();
        });
    });

    socket.on('disconnect', () => {
        console.log('user has disconnected!');
    });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
