import { useState } from "react";
function Device(data){
    const [isOn,setOn] = useState(data.data.isOn)
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
                    setOn(!isOn)
                }}
                />
            </div>
        </div>
        <div className="row mt-2 h-25 d-flex align-items-center">
                <div className="m-0 w-50 h-50">
                <span className="m-0 material-symbols-outlined" style={{backgroundColor: 
                    data.selected ? "#3054AA" : "#2396EF",borderRadius:"30%"
                }}>{data.data.icon}</span>
                </div>
            </div>
        <div className="row chivo-reg ps-2 pt-0 mt-2">
            {data.data.name}
        </div>
        </div>
        
        </>
    )
}
export default Device;