import React from 'react'
import { NavLink } from 'react-router-dom'
import LogOut from '../log-in/LogOut'

function Navbar() {
  return (
    <div className="nav-box">
      <nav className='navbar'>
        <NavLink to='/home' > Home </NavLink>
        <NavLink to ='/products'> Products </NavLink>
        <NavLink to='/create_product'>Add products </NavLink>
      </nav>
      <NavLink to='/'> <LogOut /> </NavLink>
    </div>
  )
}

export default Navbar