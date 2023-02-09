import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <div>
      <Toaster position='top-right'></Toaster>

    </div>
    <React.StrictMode>

      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </>
)
