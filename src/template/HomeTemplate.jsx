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
          Home
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
          Search
        </NavLink>
      </div>
      <div className="col-3" style={{ textAlign: "left" }}>
        <h4>SUPPORT</h4>
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
          Profile
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
          Cart
        </NavLink>
      </div>
      <div className="col-3" style={{ textAlign: "left" }}>
        <h4>REGISTER</h4>
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
          Register
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
          Login
        </NavLink>
      </div>
      <div className="footer__members col-3" style={{ textAlign: "left" }}>
        <h4
          className="normal-case text-sm pb-1 pt-2"
          style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
        >
          Triển khai dự án:
        </h4>
        <ul
          className="capitalize text-xs"
          style={{ textTransform: "capitalize", fontSize: "0.75rem" }}
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
        <span className="align-middle" style={{ verticalAlign: "middle" }}>
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
