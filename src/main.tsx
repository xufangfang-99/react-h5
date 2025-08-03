import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// 引入 UnoCSS 样式
import 'virtual:uno.css'

// 引入全局样式
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)