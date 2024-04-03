const Type = require('./models/TypeSchema'); // Import the model
const Room = require('./models/RoomSchema'); // Import the model
const Device = require('./models/DeviceSchema'); // Import the model
const connectDB = require('./database/conn'); // Import the connection
connectDB();
const active_key = process.env.ADAFRUIT_IO_KEY;

const TYPES = ["light", "temperature", "humidity", "motion", "door", "infrared", "smoke", "gas", "water", "power", "fan", "air-conditioner"];

async function get_rooms() {
    url_groups = `https://io.adafruit.com/api/v2/tminh2123/groups?x-aio-key=${active_key}`;
    const dataGroups = await fetch(url_groups).then(res => res.json());
    let rooms = [];
    for(const group of dataGroups) {
        let devices = [];
        for (const feed of group.feeds) {
            let device = await Device.findOne({ key: feed.key });
            console.log(feed.key);
            devices.push(device._id);
        };
        await Room.create({
            room_id: group.id.toString(),
            key: group.key,
            name: group.name,
            description: group.description,
            devices: devices
        });
    }
}

(async function() {
    await Device.deleteMany({});
    await Room.deleteMany({});
    await Type.deleteMany({});
    console.log("DELETE ALL DATA");
    url_feeds = `https://io.adafruit.com/api/v2/tminh2123/feeds?x-aio-key=${active_key}`
    const dataFeeds = await fetch(url_feeds).then(res => res.json())
    for (const feed of dataFeeds) {
        url = `https://io.adafruit.com/api/v2/tminh2123/feeds/${feed.key}/data?x-aio-key=${active_key}`
        const dataDevice = await fetch(url).then(res => res.json());
        dataArray = dataDevice.map(item => ({
            data_id: item.id,
            value: item.value,
            created_at: item.created_at
        }))
        let device = await Device.create({
            device_id: feed.id.toString(),
            key: feed.key,
            name: feed.name,
            data: dataArray,
            description: feed.description
        });
        let device_type = TYPES.filter(type => feed.name.toLowerCase().includes(type))[0];
        // console.log(device_type);
        let type = await Type.findOne({ name: device_type });
        if (!type) {type = await Type.create({ name: device_type });}
        type.devices.indexOf(device._id) === -1 ? type.devices.push(device._id) : console.log("Device already exists in TYPE");
        await type.save();
    }
    await get_rooms();
    // let types = [];
})();

// obj.forEach(async feed => {
//     url = `https://io.adafruit.com/api/v2/tminh2123/feeds/${feed.key}/data?x-aio-key=${active_key}`
//     const dataDevice = await fetch(url).then(res => res.json())
//     console.log(dataDevice)
//     dataArray = dataDevice.map(item => ({
//         data_id: item.id,
//         value: item.value,
//         created_at: item.created_at
//     }))

//     Device.create({
//         device_id: feed.id.toString(),
//         key: feed.key,
//         name: feed.name,
//         data: dataArray
//     })
// });

// (async function() {
//     const test_device = await Device.findOne({name: 'test-bedroom'}).exec()
//     console.log(test_device)
//     await Room.findOneAndUpdate({ room_id: 'TESTROOM' }, { $push: { devices: test_device._id } }, { new: true }).exec();
// })();

