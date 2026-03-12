// Punto de entrada principal de la aplicación React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
// Importación de los estilos globales de la aplicación
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envoltura del enrutador para habilitar la navegación SPA */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
// Fin del archivo de inicialización del DOM
