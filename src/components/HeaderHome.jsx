import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/util";
import { routeLink } from "../App";
import { BiSearch, BiSearchAlt } from "react-icons/bi";

const HeaderHome = () => {
// <<<<<<< HEAD
  // const {userLogin} = useSelector((state) => state.userReducer)
  // // const {ProductCart} = useSelector((state) => state.cartReducer)
  // // let totalquantity = ProductCart.reduce((total, item) => total + item.quantity, 0);
  //   const renderLogin = () => {
  //     if (userLogin) {
  //       return (
  //         <>
  //           <p className="text-white pt-2">Hello: </p>
  //           <NavLink
  //             className="text-white pt-2 m-2 my-sm-0"
  //             to="/profile"
  //             aria-current="page"
  //           >
  //             {userLogin.email}{" "}
  //           </NavLink>
// =======
  const { userLogin } = useSelector((state) => state.userReducer);
  const {products} = useSelector((state) => state.cartReducer)
  let totalquantity = products.reduce((total, item) => total + item.count, 0);
  const renderLogin = () => {
    if (userLogin) {
      return (
        <div className="d-flex flex-row gap-2 align-items-center m-2">
          <NavLink className='text-white mx-2 fs-4 text-decoration-none' to='/cart'>({totalquantity})<i className="fa fa-shopping-cart"></i></NavLink>
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
          <h6 className="text-white my-auto">Hello </h6>
          <NavLink
            className="text-white my-sm-0"
            to="/profile"
            aria-current="page"
          >
            {userLogin.email}{" "}
          </NavLink>
{/* >>>>>>> main */}

          <button
            className="btn btn-danger  my-sm-0"
            onClick={() => {
              if (confirm('Bạn chắc chắn muốn đăng xuất')) {
                localStorage.removeItem(ACCESS_TOKEN);
              localStorage.removeItem(USER_LOGIN);
              window.location.reload();
              routeLink.push('/login');
              }
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
  );
};

export default HeaderHome;
