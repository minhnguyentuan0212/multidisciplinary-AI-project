const { createServer } = require('http');
// const { Server } = require('socket.io');
const mongoose = require('mongoose');

const express = require('./config/express.js');
const initialFetch = require('./adafruit/fetch');
const connectDB = require('./database/conn');

const PORT = 5000;

const app = express();
const httpServer = createServer(app);
// const io = new Server(httpServer);

// io.of('/api/socket').on('connection', (socket) => {
//     console.log('socket.io: User connected: ', socket.id);

//     socket.on('disconnect', () => {
//         console.log('socket.io: User disconnected: ', socket.id);
//     });
// });

httpServer.listen(PORT, () =>
    console.log(`Server now running on port ${PORT}!`)
);

connectDB();

const connection = mongoose.connection;

connection.once('open', () => {
    // Fetch api from Adafruit at Interval of 5 seconds
    initialFetch();

    console.log('MongoDB database connected');

    // const DeviceChangeStream = connection
    // .collection('devices')
    // .watch([], { fullDocument: 'updateLookup' });

    // DeviceChangeStream.on('change', (change) => {
    // switch (change.operationType) {
    //     case 'insert':
    //     const device = {
    //         _id: change.fullDocument._id,
    //         key: change.fullDocument.key,
    //         name: change.fullDocument.name,
    //         description: change.fullDocument.description,
    //         data: change.fullDocument.data,
    //     };
    //     io.of('/api/socket').emit('newDevice', device);
    //     break;

    //     case 'update':
    //     const updateFields = change.updateDescription.updatedFields;
    //     const updateData = updateFields.data;
    //     const ObjectId = change.fullDocument.device_id;
    //     console.log(ObjectId);
    //     io.of('/api/socket').emit('updateDevice', ObjectId, updateData);
    //     break;
    // }
    // });
});

connection.on('error', (error) => console.log('Error: ' + error));