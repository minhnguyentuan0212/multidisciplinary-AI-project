import RoomCard from "./RoomCard";

function RoomBar(data){
    let rooms = data.data 
    const viewmore  = rooms.length > 4
    if (viewmore) rooms = rooms.slice(0,4)
    return (
        <>
        <div className="row chivo-reg mb-3">
            <div className="col-6 text-start p-0">Rooms</div>
            <div className="col-6 text-end">
                {viewmore? <a href="#">View all</a> : ""}
            </div>
        </div>
        <div className="row d-flex">
            {
                rooms.map((item)=> (
                    <RoomCard data={item}></RoomCard>
                ))
            }
        </div>
        </>
    )
}
export default RoomBar