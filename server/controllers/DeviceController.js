const axios = require('axios');
const Device = require('../models/DeviceSchema');
const Room = require('../models/RoomSchema');
const Type = require('../models/TypeSchema');
const baseURL = require('../adafruit/URLs');
const { check, validationResult } = require('express-validator');

const getDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        return res.status(200).json(devices);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({code: '500', msg: 'Server Error'});
    }
};

const getDeviceById = async (req, res) => {
    try {
        const device = await Device.findOne({ device_id: req.params.device_id });
        if (!device) {
        return res.status(404).json({code: '404', msg: 'Device not found'});
        }
        return res.status(200).json(device);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({code: '500', msg: 'Server Error'});
    }
};

const getDeviceData = async (req, res) => {
    try {
        const device = await Device.findOne({ device_id: req.params.device_id });
        if (!device) {
            return res.status(404).json({code: '404', msg: 'Device not found'});
        }
        const newDataArray = device.data.map(({ value, created_at, ...rest }) => ({
        value,
        created_at,
        }));
        return res.status(200).json(newDataArray);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code: '500', msg: 'Server Error'});
    }
};

const addDevice = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({code: '400', msg: 'Bad request' });
    }
    const { room_name, device_name, description } = req.body;
    console.log(req.body);
    try {
        const room = await Room.findOne({ name: room_name });
        if (!room) {
            return res.status(404).json({code: '404', msg: 'Room not found'});
        } else {
        const DeviceFields = {
            feed: {
            name: device_name,
            description: description,
            },
        };

        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };
        await axios
            .post(
            `${baseURL}/feeds?group_key=${room.key}`,
            DeviceFields,
            config
            )
            .then(async (success) => {
                return res.status(201).json({code: '201', msg: 'Added successfully' });
            })
            .catch((err) => {
                return res
                    .status(400)
                    .json({code: '400', msg: 'Bad request'});
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code: '500', msg: 'Server Error'});
    }
};

const updateDevice = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: 'Bad request' });
    }
    const { device_name } = req.body;
    try {
        let device = await Device.findOne({ device_id: req.params.device_id });
        if (device) {
            const DeviceFields = {
                name: device_name,
            };
            const config = {
                headers: {
                'Content-Type': 'application/json',
                },
            };
            await axios
                .put(
                `${baseURL}/feeds/${device.key}`,
                DeviceFields,
                config
                )
                .then(async (success) => {
                device = await Device.findOneAndUpdate(
                    { device_id: req.params.device_id },
                    { $set: DeviceFields },
                    { new: true }
                );
                return res.status(200).json(device);
                })
                .catch((err) => {
                return res
                    .status(500)
                    .json({code: '500', msg: 'Server Error'});
                });
        } else {
            return res
                .status(404)
                .json({code: '404', msg: 'Device not found'});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code: '500', msg: 'Server Error'});
    }
};

const deleteDevice = async (req, res) => {
    try {
        let device = await Device.findOne({ device_id: req.params.device_id });
        if (device) {
        await axios
            .delete(
            `${baseURL}/feeds/${device.key}`
            )
            .then(async (success) => {
            let room = await Room.findOne({
                key: device.key.split('.')[0],
            });
            let indexinRoom = room.devices.indexOf(device._id);
            room.devices = room.devices.splice(indexinRoom, 1);
            let type = await Type.findOne({ name: device.description });
            let indexinType = type.devices.indexOf(device._id);
            type.devices = type.devices.splice(indexinType, 1);
            await room.save();
            await type.save();
            await Device.findOneAndRemove({ device_id: req.params.device_id });
            return res.status(200).json({code: '200', msg: 'Device has been deleted' });
            })
            .catch((err) => {
                return res.status(500).json({code: '500', msg: 'Server Error'});
            });
        } else {
        return res
            .status(404)
            .json({code: '404', msg: 'Device not found'});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code: '500', msg: 'Server Error'});
    }
};

const addDatatoDevice = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({code:'400', msg: 'Bad request' });
    }
    const { value } = req.body;
    try {
        let device = await Device.findOne({ device_id: req.params.device_id });
        if (device) {
        const ValueField = {
            value: value,
        };
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };
        await axios
            .post(
            `${baseURL}/feeds/${device.key}/data`,
            ValueField,
            config
            )
            .then(async (success) => {
            return res.status(201).json({code: '201', msg: 'Added successfully' });
            })
            .catch((err) => {
            console.log(err);
            return res.status(500).json({code: '500', msg: 'Server Error'});
            });
        } else {
        return res.status(404).json({code: '404', msg: 'Device not found'});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code: '500', msg: 'Server Error'});
    }
};

module.exports = {
    getDevices,
    getDeviceById,
    addDevice,
    updateDevice,
    deleteDevice,
    getDeviceData,
    addDatatoDevice,
};