import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RoomBar from './components/Rooms/RoomsBar'
import Navigator from './components/Navigator/Navigator'
import History from './components/History/History'
import Member from './components/Member/Member'
import './App.css'
import Statistics from './components/Statistics/Statistics'
import chartData from './dataForTestUI'
import DevicesBar from './components/Devices/DevicesBar'
import {getAllRoomsData,getDevicesOfRoom,toggleDevice} from './business/HomePageData'
function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [selectedRoom, setSelectedRoom] = useState("0")
  const [toggleData,setToggleData] = useState(null)
  const [devicesData, setDevicesData] = useState({signal:[],devices:[]})
  useEffect(()=>{
    const getData = async () => {
      const res = await getAllRoomsData()
      setData(res)
      setSelectedRoom(res[0].room_id)
    }
    getData()
  }, []
  )
  useEffect(()=> {
    const getData = async () => {
      const res = await getDevicesOfRoom(selectedRoom)
      if (selectedRoom != "0") setDevicesData(res);
      console.log(res)
    }
    console.log(1)
    getData()
  },[selectedRoom,count])

  useEffect(() => {
    const sleep = (s) => {
      return new Promise((resolve) => setTimeout(resolve, s));
    }
    const toggle = async ()=>{
      const res = await toggleDevice(toggleData[0],toggleData[1])
      // setCount((count+1)%2)
      if (res) {
        sleep(0.2).then(()=> {
          setCount((count+1)%2)
        })
        
      }
    }
    if (toggleData) {
        toggle()
    }
  },[toggleData])
  return (
    <>
    <div className='row'>
      <div className='col-3'>
        <Navigator></Navigator>
        </div>
        <div className='col-6'>
        <RoomBar data={[data,selectedRoom,setSelectedRoom]}></RoomBar>
        <Statistics data={devicesData.signal}></Statistics>
        <DevicesBar data={[devicesData.devices,setToggleData]}></DevicesBar>
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

export default App
