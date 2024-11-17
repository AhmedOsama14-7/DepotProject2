import React from 'react'
import { NavLink } from 'react-router-dom'

export default function LinksMenu() {
  return (
   <nav>
    <ul className='navLinks'>
        <li>
            <NavLink to={"/"}>Home</NavLink>
        </li>

        <li>
            <NavLink to={"/shop"}>Shop</NavLink>
        </li>

        <li>
            <NavLink to={"/"}>About Us</NavLink>
        </li>

        <li>
            <NavLink to={"/"}>Contact Us</NavLink>
        </li>

    </ul>
   </nav>
  )
}
