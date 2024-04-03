import Device from "./Device";

function DevicesBar(data) {
    const devices = data.data[0]
    const toggleFunction = data.data[1]
    return (
    <>
    <div className="row chivo-reg mb-3 ms-2">
        Devices
    </div>
    <div className="row d-flex ms-2">
        {
            devices.map((item)=> <Device data={[item,toggleFunction]}></Device>)
        }
    </div>
    </>
   )
}
export default DevicesBar;