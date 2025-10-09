const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            console.log(`User ${userId} joined as ${userType}`);

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.lat || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            const result = await captainModel.findByIdAndUpdate(userId, 
                {
                location: {
                    lat: location.lat,
                    lng: location.lng
                    // lat: 31.6304,
                    // lng: 74.8765
                },
                
            });

            // console.log(`Updated location for captain ${userId}:`, location);
            if(!result) {
                return socket.emit('error', { message: 'Captain not found' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {

console.log(`sending message to  ${socketId}:`, messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };