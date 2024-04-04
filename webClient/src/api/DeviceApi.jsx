import axios from "axios";
import IotServerURL from "../Ultils/ApiURL";

async function setStateDevice(devide_id,state){
    const data = {
        value:state
    };
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${IotServerURL}devices/${devide_id}/data`,data,config)
        console.log(res)
        return true
    } catch(err) {
        console.log(err)
        return false
    }
}
const DevicesAPI = {setStateDevice}
export default DevicesAPI;