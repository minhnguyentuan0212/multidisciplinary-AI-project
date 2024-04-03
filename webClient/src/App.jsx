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
      setDevicesData(res)
      console.log(res)
    }
    getData()
  },[selectedRoom,count])
  return (
    <>
    <div className='row'>
      <div className='col-3'>
        <Navigator></Navigator>
        </div>
        <div className='col-6'>
        <RoomBar data={[data,selectedRoom,setSelectedRoom]}></RoomBar>
        <Statistics data={devicesData.signal}></Statistics>
        <DevicesBar data={[devicesData.devices,((device_id,state)=>{
          const toggle = async () => {
            toggleDevice(device_id,state)
          }
          toggle()
          setCount((count+1)%2)
        })]}></DevicesBar>
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
