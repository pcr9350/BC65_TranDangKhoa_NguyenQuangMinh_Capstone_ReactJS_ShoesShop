import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/util";
import { BiSearch } from "react-icons/bi";
import toast from "react-hot-toast";

const HeaderHome = () => {
  const { userLogin } = useSelector((state) => state.userReducer);
  const { products } = useSelector((state) => state.cartReducer);
  let totalquantity = products.reduce((total, item) => total + item.count, 0);
  const renderLogin = () => {
    if (userLogin) {
      return (
        <div className="d-flex flex-row gap-2 align-items-center m-2">
          <Link
            to={"/search"}
            className="d-flex flex-row align-items-center gap-1"
            style={{
              marginRight: 2,
              background: "none",
              border: 0,
              textDecoration: "none",
            }}
          >
            <BiSearch size={25} color="white" />
            <h4 className="text-white">Search</h4>

          </Link>
          <NavLink
            className="text-white mx-2 text-decoration-none"
            to="/cart"
          >
            <i className="fa fa-shopping-cart position-relative fs-4"><span className="position-absolute top-0 badge rounded-pill translate-middle bg-danger fs-6"><small>{totalquantity}</small></span></i>
          </NavLink>
          <NavLink className="text-white my-sm-0 text-decoration-none btn btn-outline-info border-0 rounded-pill" to="/profile">
            {userLogin.email}{" "}
          </NavLink>
          <NavLink
            className="text-decoration-none text-white btn btn-danger rounded-5"
            style={{ width: 75 }}
            to="/"
            onClick={() => {
              window.location.replace("/");
              localStorage.removeItem(ACCESS_TOKEN);
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem("userCart");
              toast.success("Bạn đã đăng xuất");
            }}
          >
            Logout
          </NavLink>
        </div>
      );
    } else {
      return (
        <>
          <Link
            to={"/search"}
            className="d-flex flex-row align-items-center gap-1"
            style={{
              marginRight: 2,
              background: "none",
              border: 0,
              textDecoration: "none",
            }}
          >
            <BiSearch size={25} color="white" />
            <h4 className="text-white">Search</h4>
          </Link>
          <NavLink
            className="text-decoration-none text-white btn btn-primary rounded-5 mx-2"
            style={{ width: 75 }}
            to="/login"
          >
            Login
          </NavLink>
        </>
      );
    }
  };
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        Shoes Shop
      </NavLink>
      <button
        className="d-md-none border-0 rounded-5 bg-dark"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >Menu</button>
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
        <form className="d-flex my-2 my-lg-0">{renderLogin()}</form>
      </div>
    </nav>
  );
};

export default HeaderHome;
