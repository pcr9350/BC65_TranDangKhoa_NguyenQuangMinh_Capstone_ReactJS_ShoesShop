import React from "react";
import { NavLink } from "react-router-dom";

const BottomTabMobile = () => {
  return (
    <nav className="bottom-tab-mobile mt-2 bg-dark"> 
      <div className="container"> 
        <ul className="nav justify-content-around"> 
          <li className="nav-item">
            <NavLink to="/login" className="nav-link text-white">
              <i className="fa fa-user fs-1" /> 
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/" className="nav-link text-white">
              <i className="fa fa-home fs-1" />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/cart" className="nav-link text-white">
              <i className="fa fa-cart-plus fs-1" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default BottomTabMobile;
