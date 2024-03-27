// const axios = require('axios');
const Type = require('../models/TypeSchema');

const getTypes = async (req, res) => {
    try {
        const types = await Type.find();
        res.status(200).json(types);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:'500', msg:'Server error'});
    }
};

const getTypeById = async (req, res) => {
    try {
      const type = await Type.findOne({ name: req.params.type_name });
      return res.status(200).json(type);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({code:'500', msg:'Server error'});
    }
  };
  
  const getDevicesByTypeId = async (req, res) => {
    try {
      const type = await Type
                        .findOne({ name: req.params.type_name })
                        .populate(
                            'devices',
                            ['device_id', 'key', 'name', 'description', 'data']
                        );
      return res.status(200).json(type.devices);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({code:'500', msg:'Server error'});
    }
  };
  module.exports = { getTypes, getTypeById, getDevicesByTypeId };