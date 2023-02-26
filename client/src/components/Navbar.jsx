import React from 'react'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (

    <nav className="navbar navbar-expand-lg navbar-dark  bg-primary mb-5">
      <span className="navbar-brand">
        Movie App
      </span>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/movies"> Home </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/movies/new"> New Movie </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/registro"> Register </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login"> Log In </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar