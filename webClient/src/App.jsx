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

function App() {
  const [count, setCount] = useState(0)
  // temp data for testing
  const data = [
    {"room_name":"kitchen","devices":[1,2,3],"img":kitchen,"selected":1},
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
