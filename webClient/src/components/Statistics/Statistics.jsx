import Humidity from "./Humidity"
import Temperature from "./Temperature"

function Statistics({data}){
    return (
        <>
        <div className='row chivo-reg mb-3 ms-2 mt-2'>
            Statistics
        </div>
        <div className='row ms-2'>
            <div className="col-6">
                <Humidity data={data.humidity}></Humidity>
            </div>
            <div className="col-6">
                <Temperature data={data.temperature}></Temperature>
            </div>
        </div>
        </>
    )
}
export default Statistics