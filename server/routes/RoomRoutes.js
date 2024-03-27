const express = require('express');
const { check } = require('express-validator');
const {
    getRooms,
    getRoomById,
    getDevicesByRoomId,
    addRoom,
    updateRoom,
    deleteRoom,
} = require('../controllers/RoomController');
const router = express.Router();

router.get('/rooms', getRooms);
router.get('/rooms/:room_id', getRoomById);
router.get('/rooms/:room_id/devices', getDevicesByRoomId);
router.post(
    '/rooms',
    addRoom
);
router.put('/rooms/:room_id', updateRoom);
router.delete('/rooms/:room_id', deleteRoom);

module.exports = router;