import React from "react";
import HeaderHome from "../components/HeaderHome";
import { Outlet } from "react-router-dom";
const HomeTemplate = () => {
  return (
    <div>
      <HeaderHome />
      <div className="content" style={{ minHeight: 650 }}>
        <Outlet />
      </div>
      <footer className="p-2 bg-dark text-white text-center">Footer</footer>
    </div>
  );
};

export default HomeTemplate;
