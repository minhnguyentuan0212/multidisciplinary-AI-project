const axios = require('axios');
const Room = require('../models/RoomSchema');
const { check, validationResult } = require('express-validator');
const baseURL = require('../adafruit/URLs');

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        return res.status(200).json(rooms);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:'500', msg:'Server Error'});
    }
};

const getRoomById = async (req, res) => {
    try {
        const room = await Room.findOne({ room_id: req.params.room_id });
        if (!room) {
        return res.status(400).json({ errors: [{ msg: 'Room not found' }] });
        }
        return res.json(room);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:'500', msg:'Server Error'});
    }
};

const getDevicesByRoomId = async (req, res) => {
    try {
        const room = await Room.findOne({ room_id: req.params.room_id }).populate(
        'devices',
        ['device_id', 'key', 'name', 'description', 'data']
        );

        return res.status(200).json(room.devices);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:'500', msg:'Server Error'});
    }
};

const addRoom = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({code: '400', msg: 'Bad request'});
    }
    const { group_name, description } = req.body;
    console.log(req.body)
    console.log(group_name);
    try {
        const room = await Room.findOne({ name: group_name });
        if (room) {
        return res
                .status(404)
                .json({code: '404', msg: 'Room existed' });
        } else {
            const RoomFields = {
                name: group_name,
                description: description,
            };

            const headers = {'Content-Type': 'application/json',};
            await axios
                .post(
                `${baseURL}/groups`,
                RoomFields,
                {
                    headers: headers,
                }
                )
                .then(async (success) => {
                    console.log(success.data);
                    // const newRoom = new Room({
                    //     room_id: success.data.id,
                    //     key: success.data.key,
                    //     name: group_name,
                    //     description: description,
                    // });
                    return res.status(200).json({code:'200', msg: 'Added successfully' });
                })
                .catch((err) => {
                    return res.status(500).json({code:'500', msg:'Server Error'});
                });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:'500', msg:'Server Error'});
    }
};

const updateRoom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({code:'400', msg:'Bad request'});
  }
  const { group_name, description } = req.body;
  try {
    let room = await Room.findOne({ room_id: req.params.room_id });
    if (room) {
        const RoomFields = {
            name: group_name,
            description: description,
        };
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };
        await axios
            .put(
                `${baseURL}/groups/${room.key}`,
                RoomFields,
                config
            )
            .then(async (success) => {
                room = await Room.findOneAndUpdate(
                { room_id: req.params.room_id },
                { $set: RoomFields },
                { new: true }
                );
                return res.status(200).json({code: '200', msg: 'Updated successfully'});
                // return res.status(200).send(success);
            })
            .catch((err) => {
                return res
                .status(500)
                .json({ errors: [{ msg: err.response.data.error }] });
            });
    } else {
      return res
        .status(404)
        .json({code: '404', msg:'Room not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({code:'500', msg:'Server Error'});
  }
};

const deleteRoom = async (req, res) => {
    try {
        let room = await Room.findOne({ room_id: req.params.room_id });
        if (room) {
            await axios
                .delete(`${baseURL}/groups/${room.key}`)
                .then(async (success) => {
                await Room.findOneAndRemove({ room_id: req.params.room_id });
                return res.status(200).json({code: '200',msg: 'Room has been deleted' });
                })
                .catch((err) => {
            return res.status(500).json({code:'500', msg:'Server Error'});
            });
        } else {
            return res
                .status(404)
                .json({code: '404', msg:'Room not found' });
        }
    } catch (error) {
            console.error(error.message);
            res.status(500).json({code:'500', msg:'Server Error'});
    }
};

module.exports = {
    getRooms,
    getRoomById,
    getDevicesByRoomId,
    addRoom,
    updateRoom,
    deleteRoom,
};