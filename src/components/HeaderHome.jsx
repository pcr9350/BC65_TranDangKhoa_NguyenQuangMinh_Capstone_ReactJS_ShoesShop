import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/util";
import { BiSearch } from "react-icons/bi";
import toast from "react-hot-toast";
import { FaBars } from "react-icons/fa";

const HeaderHome = () => {
  const { userLogin } = useSelector((state) => state.userReducer);
  const { products } = useSelector((state) => state.cartReducer);
  let totalquantity = products.reduce((total, item) => total + item.count, 0);
  
  const renderLogin = () => {
    if (userLogin) {
      return (
        <div className="d-flex flex-row gap-2 align-items-center m-2">
          <Link to="/search" className="d-flex flex-row text-white mx-2 text-decoration-none">
            <BiSearch size={25} className="mx-2"/>
          </Link>
          <NavLink className="text-white mx-2 text-decoration-none" to="/cart">
            <i className="fa fa-shopping-cart position-relative fs-4">
              <span className="position-absolute top-0 badge rounded-pill translate-middle bg-danger fs-6">
                <small>{totalquantity}</small>
              </span>
            </i>
          </NavLink>

          <NavLink className="text-white mx-2 text-decoration-none" to="/profile">
          <i className="fa fa-user-circle fs-3"></i>
          </NavLink>

          <button // Changed to button for better mobile behavior
            className="text-decoration-none text-white btn btn-danger rounded-5"       
            onClick={() => {
              window.location.replace("/");
              localStorage.removeItem(ACCESS_TOKEN);
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem("userCart");
              toast.success("Bạn đã đăng xuất");
            }}
          >
            Đăng xuất
          </button>
        </div>
      );
    } else {
      return (
        <div className="d-flex flex-row gap-2 align-items-center m-2">
          <Link to="/search" className="text-white mx-2 text-decoration-none">
            <BiSearch size={25} />
          </Link>
          <NavLink
            className="text-decoration-none text-white btn btn-primary rounded-5"
            style={{ width: 120 }}
            to="/login"
          >
            Đăng nhập
          </NavLink>
        </div>
      );
    }
  };

  // set fixed-top nav-bar
  const [isFixed, setIsFixed] = useState(false);
  // State for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-md navbar-dark bg-dark ${
        isFixed ? "fixed-top" : ""
      }`}
    >
      <NavLink className="navbar-brand" to="/">
        Shoes Shop
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <FaBars /> {/* Use the bars icon for the toggle */}
      </button>
      <div
        className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`}
        id="collapsibleNavId"
      >
        <ul className="navbar-nav me-auto mt-2 mt-lg-0 flex-column flex-md-row p-1">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home" aria-current="page">
              Trang chủ
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Đăng kí
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cart">
              Giỏ hàng
            </NavLink>
          </li>
        </ul>
        <div className="d-flex justify-content-end">
          <form className="d-flex my-2 my-lg-0">{renderLogin()}</form>
        </div>
      </div>
    </nav>
  );
};

export default HeaderHome;
