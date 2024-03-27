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
        `${baseURL}/feeds/${device.key}/data?limit=10`
      );

      const responseData = response.data;
      // console.log(responseData);

      if (responseData.length !== 0) {
        responseData.map(async (eachData) => {
          const { id, value, created_at } = eachData;
          const newData = { data_id: id, value, created_at };
          if (device.data.length == 15) {
            device.data.pop();
          }

          if (device.data.length == 0) {
            device.data.push(newData);
          }

          if (device.data.filter((e) => e.data_id == id).length == 0) {
            device.data.unshift(newData);
          }
        });
        await device.save();
      }
    });
    return Promise.resolve(true);
  } catch (error) {
    console.error(error.message);
  }
};

const initialFetch = async () => {
    setInterval(async () => {
        var start =  new Date().getTime();
        // TODO: Fetch data from Adafruit
        await getData();
        var end = new Date().getTime();
        console.log(`Fetched time: ${end - start} ms`)
    }, 5000)
};

module.exports = initialFetch;