import React from "react";
import HeaderHome from "../components/HeaderHome";
import { NavLink, Outlet } from "react-router-dom";
import ResponsiveItem from "./ResponsiveItem";
import BottomTabMobile from "../components/BottomTabMobile";

const footerDesktop = <footer className='bg-dark text-white text-center p-3 row'>
    <div className="col-4">
      <h3>GET HELP</h3>
      <NavLink to={'/'} className="text-white mx-2 fs-5 text-decoration-none d-block">Home</NavLink>
      <NavLink to={'/Search'} className="text-white mx-2 fs-5 text-decoration-none d-block">Search</NavLink>

    </div>
    <div className="col-4">
    <h3>SUPPORT</h3>
      <NavLink to={'/profile'} className="text-white mx-2 fs-5 text-decoration-none d-block">Profile</NavLink>
      <NavLink to={'/cart'} className="text-white mx-2 fs-5 text-decoration-none d-block">Cart</NavLink>
    </div>
    <div className="col-4">
    <h3>REGISTER</h3>
      <NavLink to={'/register'} className="text-white mx-2 fs-5 text-decoration-none d-block">Register</NavLink>
      <NavLink to={'/login'} className="text-white mx-2 fs-5 text-decoration-none d-block">Login</NavLink>
    </div>
</footer>

const HomeTemplate = () => {
  return (
    <div>
      <HeaderHome />
      <div className="content" style={{ minHeight: 650 }}>
        <Outlet />
      </div>
      <ResponsiveItem component={footerDesktop} mobileComponent={<BottomTabMobile />} />
      
    </div>
  );
};

export default HomeTemplate;
