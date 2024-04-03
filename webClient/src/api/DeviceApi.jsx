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
        console.log(123456)
        const res = await axios.post(`${IotServerURL}devices/${devide_id}/data`)
        console.log(res)
    } catch(err) {
        console.log(err)
    }
}
const DevicesAPI = {setStateDevice}
export default DevicesAPI;