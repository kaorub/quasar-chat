const express = require('express');
const app = express();

const server = app.listen(3001, function () {
    console.log('server running on port 3001');
})
const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log('user connected', socket.id);

    const username = (socket.id).toString().substr(0, 5);
    const roomname = `room ${username}`;
    socket.join(roomname);

    const time = (new Date).toLocaleTimeString();
    
    socket.json.send({
        'event': 'connected',
        'name': 'admin',
        'time': time,
        'message': `Hello, ${username}! Please ask me anything you want`,
    });

    // socket.on('welcome', (data) => {
    //     socket.json.send({
    //         ...data,
    //         'event': 'connected',
    //         'name': username,
    //         'user': socket.id,
    //         'time': time
    //     });
    //     io.emit('send welcome message to client', data, socket.id);
    // });

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

    socket.on('send admin message', (data) => {
        io.emit('send message to client', msg);
    });

    socket.on('join room', (data) => {
        io.to(`room ${data.name}`).emit('send message to client', {
            ...data,
            'event': 'private',
            'user': data.name,
            'time': time,
            'name': 'admin',
        });
    })

    socket.on('disconnect', () => {
        io.emit('DELETE_MESSAGES');
        console.log('user disconnected');
      });
});
