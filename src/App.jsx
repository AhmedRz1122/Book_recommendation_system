import { useState } from 'react'
import Loginpage from './Components/Loginpage'
import Registerpage from './Components/Registerpage'
import Home from './Components/Home'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Registerpage/> */}
    {/* <Loginpage /> */}
    <Home />

    </>
  )
}

export default App
