const express = require('express');
const app = express();

const server = app.listen(3001, function () {
    console.log('server running on port 3001');
})
const io = require('socket.io')(server);

io.on('connection', function(socket) {
    io.emit('addition of connected user', socket.id);

    const username = (socket.id).toString().substr(0, 5);
    const roomname = `room ${username}`;
    socket.join(roomname);
    console.log('user connected to', roomname);

    const time = (new Date).toLocaleTimeString();
    
    socket.json.send({
        'event': 'connected',
        'time': time,
        'socketId': socket.id,
        'message': `Hello, ${username}! Please ask me anything you want`,
    });

    socket.on('send message', (msg) => {
        socket.json.send({
            ...msg,
            'event': 'connected', 
            'user': socket.id,
            'time': time,
            'name': username, 
        });
        io.emit('send message to admin', msg);
    });

    socket.on('send admin message', (msg) => {
        io.emit('send message to client', msg);
    });

    socket.on('join room', (data) => {
        socket.join(`room ${data.name}`);
        
        console.log('admin connected to room', data.name);

        io.to(`room ${data.name}`).emit('send message to client', {
            ...data,
            'event': 'private',
            'user': data.name,
            'time': time,
            'name': 'admin',
        });
    });

    socket.on('operator logged out', () => {
        socket.emit('clear all messages');
    });

    socket.on('disconnect', () => {
        io.emit('delete users', username);
        console.log('user disconnected');
      });
});
