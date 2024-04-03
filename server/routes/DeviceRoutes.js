const { check } = require('express-validator');
const {
    getDevices,
    getDeviceById,
    addDevice,
    updateDevice,
    deleteDevice,
    getDeviceData,
    addDatatoDevice,
    receiveDataFromAdafruit,
} = require('../controllers/DeviceController');
const express = require('express');
const router = express.Router();

router.get('/devices', getDevices);
router.get('/devices/:device_id', getDeviceById);
router.get('/devices/:device_id/data', getDeviceData);
router.post(
  '/devices/:device_id/data',
  addDatatoDevice
);
router.post(
  '/devices/:device_id/receive_data',
  receiveDataFromAdafruit
);
router.post(
  '/devices',
  addDevice
);
router.put('/devices/:device_id', updateDevice);
router.delete('/devices/:device_id', deleteDevice);

module.exports = router;