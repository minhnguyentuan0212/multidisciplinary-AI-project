import { useState,useEffect } from "react";
function Device(data){
    const devices = data.data[0]
    const toggleFunction = data.data[1]
    const isOn = (devices.data.length != 0 &&  devices.data[0].value == 1)
    return (
        <>
        <div 
        className="me-3 mb-2" 
        style={{width:"22%",aspectRatio:"1/1",borderRadius:"10%",backgroundColor: isOn?"#6EA8FE":"white"}}>
        <div className="row">
            <div className="col-6 text-start chivo-reg">
                {isOn? "On":"Off"}
            </div>
            <div className="col-6 align-content-end form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" checked={isOn}
                onChange={(e) => {
                    toggleFunction([devices.device_id,isOn?1:0])
                }}
                />
            </div>
        </div>
        <div className="row mt-2 h-25 d-flex align-items-center">
                <div className="m-0 w-50 h-50">
                <span className="m-0 material-symbols-outlined" style={{backgroundColor: 
                    data.selected ? "#3054AA" : "#2396EF",borderRadius:"30%"
                }}>{devices.icon}</span>
                </div>
            </div>
        <div className="row chivo-reg ps-2 pt-0 mt-2">
            {devices.name}
        </div>
        </div>
        
        </>
    )
}
export default Device;