import React from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './components/nav/Navbar'
import Login from './components/log-in/LogIn'
import Products from './pages/products/Products'
import CreateProduct from './components/create_product/CreateProduct'
import UserInfo from './pages/users/UserInfo'
import ProductOption from './pages/products/ProductOption'
import Register from './components/log-in/Register'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/create_product' element={<CreateProduct />} />
          <Route path='/user_info/:id' element={<UserInfo />} />
          <Route path='/prod_option/:id' element={<ProductOption />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App