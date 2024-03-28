import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigator from './components/Navigator/Navigator'
import Member from './components/Member/Member'
import History from './components/History/History'

function App() {
  return <div className="App"><Navigator /><Member /><History /></div>
}

export default App
