import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home.jsx';
import Cadastro from './routes/Cadastro.jsx';
import Perfil from './routes/Perfil.jsx';
import "bootstrap/dist/css/bootstrap.min.css"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cadastro' element={<Cadastro/>}></Route>
        <Route path='/:id' element={<Perfil/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
