import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import kitchen from './assets/kitchen.svg'
import RoomBar from './components/Rooms/RoomsBar'
import Navigator from './components/Navigator/Navigator'
import History from './components/History/History'
import Member from './components/Member/Member'
import './App.css'
import Statistics from './components/Statistics/Statistics'
import chartData from './dataForTestUI'
import DevicesBar from './components/Devices/DevicesBar'

function App() {
  const [count, setCount] = useState(0)
  // temp data for testing
  const data = [
    {"room_name":"kitchen","devices":[
      {
        name:"air conditioner",
        isOn: true,
        id: 12345,
        icon: "severe_cold"
      }, 
      {
        name:"Television",
        isOn: false,
        id: 12346,
        icon: "tv"
      },
      {
          name:"Lamp",
          isOn: false,
          id: 12347,
          icon:"table_lamp"
      },
      {
        name:"Light at the bed",
        isOn: true,
        id: 12348,
        icon: "light"
      },
      {
        name:"Light at the door",
        isOn: true,
        id: 12349,
        icon: "light"
      },
    ],"img":kitchen,"selected":1},
    {"room_name":"living room","devices":[1,2,3],"img":kitchen,"selected":0},
    {"room_name":"bathroom","devices":[1,2,3,4],"img":kitchen,"selected":0},
    {"room_name":"bedroom","devices":[1,2,3,4],"img":kitchen,"selected":0},
    {"room_name":"bedroom","devices":[1,2,3,4],"img":kitchen,"selected":0},
    {"room_name":"bedroom","devices":[1,2,3,4],"img":kitchen,"selected":0}
]
  return (
    <>
    <div className='row'>
      <div className='col-3'>
        <Navigator></Navigator>
        </div>
        <div className='col-6'>
        <RoomBar data={data}></RoomBar>
        <Statistics data={chartData}></Statistics>
        <DevicesBar data={data[0].devices}></DevicesBar>
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
