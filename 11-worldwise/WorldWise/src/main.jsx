import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// With Routing, we match different URLs to different UI views (Ract components) : routes

// then when one of those specific url's gots visited the corrisponding React component will be rendered, this enables users to navigate between different app srcreens, using the browser url 