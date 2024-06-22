import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/util";
import { routeLink } from "../App";
import { BiSearch, BiSearchAlt } from "react-icons/bi";

const HeaderHome = () => {

  const { userLogin } = useSelector((state) => state.userReducer);
  const { products } = useSelector((state) => state.cartReducer)
  let totalquantity = products.reduce((total, item) => total + item.count, 0);
  const renderLogin = () => {
    if (userLogin) {
      return (
        <div className="d-flex flex-row gap-2 align-items-center m-2">
          <Link
            to={"/search"}
            className="d-flex flex-row align-items-center gap-1"
            style={{
              marginRight: 10,
              background: "none",
              border: 0,
              textDecoration: "none",
            }}
          >
            <BiSearch size={30} color="white" />
            <h4 className="text-white">Search</h4>
          </Link>
          <NavLink
            className="text-white mx-2 fs-4 text-decoration-none"
            to="/cart"
          >
            ({totalquantity})<i className="fa fa-shopping-cart"></i>
          </NavLink>
          <h6 className="text-white my-auto">Hello </h6>
          <NavLink
            className="text-white my-sm-0"
            to="/profile"
            aria-current="page"
          >
            {userLogin.email}{" "}
          </NavLink>

          <button
            className="btn btn-danger rounded-5 my-sm-0"
            onClick={() => {
              localStorage.removeItem(ACCESS_TOKEN);
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem("userCart")
              window.location.reload();
              routeLink.replace('/home');
            }}
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <>
        <Link
            to={"/search"}
            className="d-flex flex-row align-items-center gap-1"
            style={{
              marginRight: 10,
              background: "none",
              border: 0,
              textDecoration: "none",
            }}
          >
            <BiSearch size={30} color="white" />
            <h4 className="text-white">Search</h4>
          </Link>
          <button className="btn btn-primary rounded-5 pt-2 m-2 my-sm-0" onClick={()=>{
            routeLink.push('/login');
          }}>
          {/* <NavLink
            className="text-decoration-none text-white"
            to="/login"
            aria-current="page"
          >
            Login
          </NavLink> */}
          Login
          </button>
          
        </>
      );
    }
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        Shoes Shop
      </NavLink>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home" aria-current="page">
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cart">
              Cart
            </NavLink>
          </li>
        </ul>
        <form className="d-flex my-2 my-lg-0">
          {renderLogin()}
        </form>
      </div>
    </nav>
  );
};

export default HeaderHome;
