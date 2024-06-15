import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ACCESS_TOKEN, USER_LOGIN } from '../util/util'
import { routeLink } from '../App'

const HeaderHome = () => {
  const {userLogin} = useSelector((state) => state.userReducer)

    const renderLogin = () => {
      if (userLogin) {
        return (
          <>
            <p className="text-white pt-2">Hello </p>
            <NavLink
              className="text-white pt-2 m-2 my-sm-0"
              to="/profile"
              aria-current="page"
            >
              {userLogin.email}{" "}
            </NavLink>

            <button
              className="btn btn-danger m-2 my-sm-0"
              onClick={() => {
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(USER_LOGIN);
                window.location.reload();
              }}
            >
              Logout
            </button>
          </>
        );
      } else {
        return (
          <>
            <NavLink
            className="btn btn-primary pt-2 m-2 my-sm-0 text-decoration-none text-white"
            to="/login"
            aria-current="page"
          >
            Login
          </NavLink>
              
            
          </>
        );
      }
    };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <NavLink className="navbar-brand" to="/">Shoes Shop</NavLink>
    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
    <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
                <NavLink className="nav-link" to="/home" aria-current="page">Home</NavLink>
            </li>
            
            <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/cart">Cart</NavLink>
            </li>
            {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                    <a className="dropdown-item" href="#">Action 1</a>
                    <a className="dropdown-item" href="#">Action 2</a>
                </div>
            </li> */}
        </ul>
        <form className="d-flex my-2 my-lg-0">
            {/* <input className="form-control me-sm-2" type="text" placeholder="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                Search
            </button> */}
            {renderLogin()}
        </form>
    </div>
</nav>
  )
}

export default HeaderHome