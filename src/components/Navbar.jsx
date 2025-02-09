import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='navbar'>
      <NavLink to='/' className='links'>
     Home
      </NavLink>

      <NavLink to='/pastes' className='links'>
        Notes
      </NavLink>
    </div>
  )
}

export default Navbar
