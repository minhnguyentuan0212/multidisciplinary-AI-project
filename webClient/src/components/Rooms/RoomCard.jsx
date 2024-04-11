function RoomCard(data) {
    const room = data.data[0]
    const selected = (data.data[1] == room.room_id)
    const setSelected = data.data[2]
    // return <></>
    return (
        <div className={
            selected
            ? "bg-primary room-card me-3 mb-2 btn"
            : "room-card me-3 mb-2 btn"
        } style={{width:"22%",aspectRatio:"1/1",borderRadius:"10%"}} onClick={(e)=>{
            e.preventDefault()
            setSelected(room.room_id)}}>
            <div className="row h-50 d-flex align-items-center">
                <div className="m-0 w-50 h-50">
                <span className="m-0 material-symbols-outlined" style={{backgroundColor: 
                    selected ? "#3054AA" : "#2396EF", borderRadius:"30%"
                }}>{room.icon}</span>
                </div>
            </div>
            <div className="row ps-3 chivo-reg" style={{color: selected? 'white':"black"}}>
                {room.name}
            </div>
            <div className="row ps-3 chivo-reg" style={{color: selected? 'white':"black"}}>
                {room.devices.length} {room.devices.length === 1 ? 'device' : 'devices'}
            </div>
        </div>
        
    )
}
export default RoomCard;