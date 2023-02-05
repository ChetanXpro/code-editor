import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Router } from 'react-router-dom'
import Home from './pages/Home'

function App() {


  return (
<>
    <Router>
      <Route path='/' element={<Home />} />

    </Router>
</>

  )
}

export default App
