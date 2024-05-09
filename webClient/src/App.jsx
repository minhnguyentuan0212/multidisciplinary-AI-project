import Navigator from './components/Navigator/Navigator'
import './App.css'
import { Outlet } from 'react-router-dom'
function App() {
  return (
    <>
    <div className='row'>
      <div className='col-3'>
        <Navigator></Navigator>
      </div>
      <Outlet></Outlet>
    </div>
      
    </>
  )
}

export default App