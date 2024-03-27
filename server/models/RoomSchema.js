const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    room_id: {
        type: String,
        required: true,
    },
    key: {
        type: String,
    },
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    // Array of devices
    devices: [
        {
            type: Schema.Types.ObjectId,
            ref: 'devices',
        },
    ],
});

Room = mongoose.model('rooms', RoomSchema);
module.exports = Room;