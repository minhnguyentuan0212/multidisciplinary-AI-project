const {
    getTypes,
    getTypeById,
    getDevicesByTypeId,
} = require('../controllers/TypeController');
const express = require('express');
const router = express.Router();

router.get('/types', getTypes);
router.get('/types/:type_name', getTypeById);
router.get('/types/:type_name/devices', getDevicesByTypeId);

module.exports = router;