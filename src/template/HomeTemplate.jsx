import React from "react";
import HeaderHome from "../components/HeaderHome";
import { NavLink, Outlet } from "react-router-dom";
import ResponsiveItem from "./ResponsiveItem";
import BottomTabMobile from "../components/BottomTabMobile";
import { MdPerson } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

const footerDesktop = (
  <footer
    className="bg-dark text-white text-center p-3 mt-2"
    style={{
      padding: "1rem",
      backgroundColor: "#343a40",
      color: "#fff",
      textAlign: "center",
    }}
  >
    <div
      className="row justify-content-between w-100"
      style={{
        justifyContent: "space-between",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      <div className="col-3" style={{ textAlign: "left" }}>
        <h4>SHOES SHOP</h4>
        <NavLink
          to={"/"}
          className="text-white mx-2 fs-5 text-decoration-none d-block"
          style={{
            color: "#fff",
            margin: "0.5rem 0",
            fontSize: "1.25rem",
            textDecoration: "none",
          }}
        >
          Trang chủ
        </NavLink>
        <NavLink
          to={"/Search"}
          className="text-white mx-2 fs-5 text-decoration-none d-block"
          style={{
            color: "#fff",
            margin: "0.5rem 0",
            fontSize: "1.25rem",
            textDecoration: "none",
          }}
        >
          Tìm kiếm
        </NavLink>
      </div>
      <div className="col-3" style={{ textAlign: "left" }}>
        <h4>HỖ TRỢ</h4>
        <NavLink
          to={"/profile"}
          className="text-white mx-2 fs-5 text-decoration-none d-block"
          style={{
            color: "#fff",
            margin: "0.5rem 0",
            fontSize: "1.25rem",
            textDecoration: "none",
          }}
        >
          Hố sơ
        </NavLink>
        <NavLink
          to={"/cart"}
          className="text-white mx-2 fs-5 text-decoration-none d-block"
          style={{
            color: "#fff",
            margin: "0.5rem 0",
            fontSize: "1.25rem",
            textDecoration: "none",
          }}
        >
          Giỏ hàng
        </NavLink>
      </div>
      <div className="col-3" style={{ textAlign: "left" }}>
        <h4>ĐĂNG KÍ</h4>
        <NavLink
          to={"/register"}
          className="text-white mx-2 fs-5 text-decoration-none d-block"
          style={{
            color: "#fff",
            margin: "0.5rem 0",
            fontSize: "1.25rem",
            textDecoration: "none",
          }}
        >
          Đăng kí
        </NavLink>
        <NavLink
          to={"/login"}
          className="text-white mx-2 fs-5 text-decoration-none d-block"
          style={{
            color: "#fff",
            margin: "0.5rem 0",
            fontSize: "1.25rem",
            textDecoration: "none",
          }}
        >
          Đăng nhập
        </NavLink>
      </div>
      <div className="footer__members col-3" style={{ textAlign: "left" }}>
        <h4
          
        >
          TRIỂN KHAI DỰ ÁN:
        </h4>
        <ul
          className="capitalize"
          style={{ textTransform: "capitalize"}}
        >
          <li
            className="leading-5 flex items-center tracking-wide"
            style={{
              lineHeight: "1.25rem",
              display: "flex",
              alignItems: "center",
              letterSpacing: "0.05em",
            }}
          >
            <MdPerson
              className="inline-block mr-1 text-green-600"
              style={{
                display: "inline-block",
                marginRight: "0.25rem",
                color: "#28a745",
              }}
            />{" "}
            Trần Đăng Khoa
          </li>
          <li
            className="leading-5 flex items-center tracking-wide"
            style={{
              lineHeight: "1.25rem",
              display: "flex",
              alignItems: "center",
              letterSpacing: "0.05em",
            }}
          >
            <MdPerson
              className="inline-block mr-1 text-green-600"
              style={{
                display: "inline-block",
                marginRight: "0.25rem",
                color: "#28a745",
              }}
            />{" "}
            Nguyễn Quang Minh
          </li>
        </ul>
      </div>
    </div>
    <div
      className="footer__bot text-center mt-3"
      style={{ textAlign: "center", marginTop: "1rem" }}
    >
      <p>
        <FaInfoCircle
          className="inline-block mr-3 align-middle"
          style={{
            display: "inline-block",
            marginRight: "0.75rem",
            verticalAlign: "middle",
          }}
        />
        <span className="align-middle">
          Cybersoft, BC65 Front End: 02/2024 ~ 08/2024
        </span>
      </p>
    </div>
  </footer>
);

const HomeTemplate = () => {
  return (
    <div>
      <HeaderHome />
      <div className="content" style={{ minHeight: 650 }}>
        <Outlet />
      </div>
      <ResponsiveItem
        component={footerDesktop}
        mobileComponent={<BottomTabMobile />}
      />
    </div>
  );
};

export default HomeTemplate;
