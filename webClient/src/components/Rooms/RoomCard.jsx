function RoomCard({data}) {
    return (
        <div className={
            data.selected
            ? "bg-primary room-card me-4"
            : "room-card me-4"
        } style={{width:"20%",aspectRatio:"1/1",borderRadius:"10%"}}>
            <div className="row h-50 d-flex align-items-center">
                <div className="m-0 w-50 h-50">
                <img alt={data.room_name} className="m-0" style={{backgroundColor: 
                    data.selected ? "#3054AA" : "#2396EF",borderRadius:"30%"
                }} src={data.img}/>
                </div>
            </div>
            <div className="row ps-3 chivo-reg" style={{color: data.selected? 'white':"black"}}>
                {data.room_name}
            </div>
            <div className="row ps-3 chivo-reg" style={{color: data.selected? 'white':"black"}}>
                {data.devices.length} devices
            </div>
        </div>
        
    )
}
export default RoomCard;