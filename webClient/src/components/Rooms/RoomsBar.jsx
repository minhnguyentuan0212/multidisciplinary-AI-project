import RoomCard from "./RoomCard";
import { useState } from "react";

function RoomBar(data){
    let rooms = data.data 
    const viewmore  = rooms.length > 4
    const [viewAll,setViewAll] = useState(false)
    const numDisplay = viewmore?4:rooms.length
    return (
        <>
        <div className="row chivo-reg mb-3 ms-2">
            <div className="col-6 text-start p-0">Rooms</div>
            <div className="col-6 text-end">
                {viewmore? <button className="btn btn-light" onClick={(e) => {
                    e.preventDefault()
                    setViewAll(!viewAll)
                }}>{viewAll?"View less":"View all"}</button> : ""}
            </div>
        </div>
        <div className="row d-flex ms-2">
            {
                rooms.slice(0,viewAll?rooms.length:numDisplay).map((item)=> (
                    <RoomCard data={item}></RoomCard>
                ))
            }
        </div>
        </>
    )
}
export default RoomBar