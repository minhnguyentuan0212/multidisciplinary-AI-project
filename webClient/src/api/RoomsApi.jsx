import axios from "axios";
import IotServerURL from "../Ultils/ApiURL";
async function getAllRooms() {
    try{
        const roomsData = await axios.get(`${IotServerURL}rooms`)
        return roomsData
    }
    catch (err) {
        console.log(err)
        return {}
    }
}
async function getDevicesByRoomID(roomID){
    try{
        const devices = await axios.get(`${IotServerURL}rooms/${roomID}/devices`)
        return devices
    } 
    catch (err) {
        console.log(err)
        return {}
    }
}

const RoomsAPI = {getAllRooms,getDevicesByRoomID} 
export default RoomsAPI