import { useEffect, useState } from 'react'
import RoomBar from '../components/Rooms/RoomsBar'
import History from '../components/History/History'
import Member from '../components/Member/Member'
import Statistics from '../components/Statistics/Statistics'
import DevicesBar from '../components/Devices/DevicesBar'
import cameraIcon from '../assets/photo-camera.svg'; // Import your camera icon SVG file
import axios from 'axios'; // Import Axios for making HTTP requests
import {getAllRoomsData,getDevicesOfRoom,toggleDevice} from '../business/HomePageData'
function Home() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [selectedRoom, setSelectedRoom] = useState("0")
  const [toggleData,setToggleData] = useState(null)
  const [devicesData, setDevicesData] = useState({signal:[],devices:[]})

  const handleCameraIconClick = async () => {
    try {
      // Make a POST request to the server-side endpoint
      await axios.post('http://localhost:3001/execute-python-script', {});
      console.log('Python script executed successfully');
    } catch (error) {
      console.error('Error executing Python script:', error);
    }
  };

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
      if (selectedRoom != "0") {
        const res = await getDevicesOfRoom(selectedRoom)
        setDevicesData(res);
      }
    }
    getData()
  },[selectedRoom,count])

  useEffect(() => {
    const toggle = async ()=>{
      const res = await toggleDevice(toggleData[0],toggleData[1])
      if (res) {
          setTimeout(()=>{
            setCount((count+1)%2)
          },1000)    
      }
    }
    if (toggleData) {
        toggle()
    }
  },[toggleData])
  return (
    <>
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
          <div className='row'>
          <button onClick={handleCameraIconClick} style={{ width: '50px', height: '50px' }}>
            <img src={cameraIcon} alt="Camera Icon" style={{ width: '100%', height: '100%' }}/>
          </button>
          </div>
        </div>
      
    </>
  )
}

export default Home
