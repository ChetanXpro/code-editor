import { useState } from 'react'

import './App.css'
import { Route, Routes, Router } from 'react-router-dom'
import Home from './pages/Home'
import EditorPage from './pages/EditorPage'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/editor/:roomid' element={<EditorPage />} />
      </Routes>
    </>

  )
}
export default App
