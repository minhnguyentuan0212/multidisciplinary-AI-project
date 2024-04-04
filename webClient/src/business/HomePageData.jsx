import IconMapping from "../Ultils/MappingIcon";
import DevicesAPI from "../api/DeviceApi";
import RoomsAPI from "../api/RoomsApi";

async function getAllRoomsData(){
    const data = await RoomsAPI.getAllRooms()
    let res =  data.data.map((item)=>({...item,"icon":IconMapping[item.name.toLowerCase()]}))
    let result = []
    for (var i in res)
        result.push(res[i])
    result[0].selected = true 
    return result
}
async function processSignalData(data){
    let res = {...data}
    let signal = {
        labels: [],
        datasets: [{
            data: [],
            fill: false,
            pointRadius: 0,
            borderColor: data.key.includes("temperature")?"Orange":"Blue"
        }]
    }
    for (var key in await data.data) {
        signal.labels.push(key)
        signal.datasets[0].data.push(Number(data.data[key].value))
    }
    res.data = signal
    return res
}

async function getDevicesOfRoom(room_id) {
    const data = await RoomsAPI.getDevicesByRoomID(room_id)
    let devices = {devices:[],signal:[]}
    for (var i in data.data) {
        const device = data.data[i] 
        if (device.key.includes( "humidity") || device.key.includes("temperature")) {
            const signal = await processSignalData(device)
            devices.signal.push(signal)
        }  
        else
            devices.devices.push(device)
    }
    return devices
}

async function toggleDevice(devide_id,currValue) {
    const state = `${(Number(currValue)+1)%2}`
    const res = await DevicesAPI.setStateDevice(devide_id,state)
    return res
}
export {getAllRoomsData,getDevicesOfRoom,toggleDevice};