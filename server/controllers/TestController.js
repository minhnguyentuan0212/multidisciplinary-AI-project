const axios = require('axios');
const Test = require('../models/DeviceSchema');
const baseURL = require('../adafruit/URLs');
const { check, validationResult } = require('express-validator');

const getTest = async (req, res) => {
    try {
        const tests = await Test.find();

        return res.json(tests);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const addTest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { room_name, device_name, description } = req.body;
    try {
        const test = await Test.findOne({ name: room_name });
        if (!room) {
            return res.status(400).json({ errors: [{ msg: 'Test not found' }] });
        } else {
        const TestFields = {
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
                return res.json({ msg: 'Added successfully' });
            })
            .catch((err) => {
                return res
                    .status(500)
                    .json({ errors: [{ msg: err.response.data.error }] });
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
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
            return res.json({ msg: 'Device has been deleted' });
            })
            .catch((err) => {
            return res
                .status(400)
                .json({ errors: [{ msg: err.response.data.error }] });
            });
        } else {
        return res
            .status(400)
            .json({ errors: [{ msg: 'This device is not existed' }] });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const getDeviceData = async (req, res) => {
    try {
        const device = await Device.findOne({ device_id: req.params.device_id });
        if (!device) {
            return res.status(400).json({ errors: [{ msg: 'Device not found' }] });
        }
        const newDataArray = device.data.map(({ value, created_at, ...rest }) => ({
        value,
        created_at,
        }));
        return res.json(newDataArray);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const addDatatoDevice = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
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
            return res.json(success.data);
            })
            .catch((err) => {
            console.log('error');
            return res
                .status(500)
                .json({ errors: [{ msg: err.response.data.error }] });
            });
        } else {
        return res
            .status(500)
            .json({ errors: [{ msg: 'This device is not existed' }] });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
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