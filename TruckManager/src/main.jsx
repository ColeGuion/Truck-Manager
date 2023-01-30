/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

/*-------------------------------------------------------------------
    Root react element

    Currently in strict mode, for help with development debugging
-------------------------------------------------------------------*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
