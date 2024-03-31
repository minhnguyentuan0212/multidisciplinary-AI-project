import Device from "./Device";

function DevicesBar(data) {
   return (
    <>
    <div className="row chivo-reg mb-3 ms-2">
        Devices
    </div>
    <div className="row d-flex ms-2">
        {
            data.data.map((item)=> <Device data={item}></Device>)
        }
    </div>
    </>
   )
}
export default DevicesBar;