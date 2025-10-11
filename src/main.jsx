import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'  // ← добавил .jsx
import './styles/main_style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)