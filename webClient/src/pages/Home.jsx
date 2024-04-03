import { useEffect, useState } from 'react'
// import reactLogo from '../assets/react.svg'
// import viteLogo from '../vite.svg'
import RoomBar from '../components/Rooms/RoomsBar'
import Navigator from '../components/Navigator/Navigator'
import History from '../components/History/History'
import Member from '../components/Member/Member'

import Statistics from '../components/Statistics/Statistics'
import chartData from '../dataForTestUI'
import DevicesBar from '../components/Devices/DevicesBar'
import getAllRooms from '../api/RoomsApi'
function Home() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  useEffect(()=>{
    const getData = async () => {
      const data = await getAllRooms()
      setData(data)
      console.log(data)
    }
    getData()
  }, []
  )
  return (
    <>
    <div className='row'>
      <div className='col-3'>
        <Navigator></Navigator>
        </div>
        <div className='col-6'>
        <RoomBar data={data}></RoomBar>
        {/* <Statistics data={chartData}></Statistics>
        <DevicesBar data={data[0].devices}></DevicesBar> */}
        </div>
        <div className='col-3'>
          <div className='row'>
            <Member></Member>
          </div>
          <div className='row'>
            <History></History>
          </div>
        </div>
    </div>
      
    </>
  )
}

export default Home
