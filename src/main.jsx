import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppErrorBoundary } from './components/AppErrorBoundary.jsx'
import App from './App.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>,
)
