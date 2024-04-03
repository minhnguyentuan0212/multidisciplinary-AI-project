const active_key = process.env.ADAFRUIT_IO_KEY;
const axios = require('axios');
const baseURL = require('./URLs');
// const Test = require('../models/Test');
const Device = require('../models/DeviceSchema');

const setActiveKey = (token) => {
  if (token) {
    axios.defaults.headers.common['X-AIO-Key'] = token;
  } else {
    delete axios.defaults.headers.common['X-AIO-Key'];
  }
};

setActiveKey(active_key);

const getData = async () => {
  try {
    const devices = await Device.find();
    devices.map(async (device) => {
      const response = await axios.get(
        `${baseURL}/feeds/${device.key}/data?limit=30`
      );

      const responseData = response.data;
      const existingIds = new Set(device.data.map(e => e.data_id));
      if (responseData.length !== 0) {
        for (const eachData of responseData) {
          const { id, value, created_at } = eachData;
          if (!existingIds.has(id)) {
            const newData = { data_id: id, value, created_at };
            console.log(`New data in ${device.key}: `, newData);
            device.data.unshift(newData);
            existingIds.add(id);
          }
        }
        if (device.data.length > 30) {
          device.data = device.data.slice(0,30);
        }
        await device.save();
      }
    });
    return Promise.resolve(true);
  } catch (error) {
    console.error(error.message);
  }
};

const initialFetch = async () => {
    // setInterval(async () => {
    //     var start =  new Date().getTime();
    //     // TODO: Fetch data from Adafruit
    //     try {
    //       await getData();
    //     } catch (error) {
    //       console.error('Cannot fetch');
    //     }
    //     var end = new Date().getTime();
    //     console.log(`Fetched time: ${end - start} ms`)
    // }, 5000)
};

module.exports = initialFetch;