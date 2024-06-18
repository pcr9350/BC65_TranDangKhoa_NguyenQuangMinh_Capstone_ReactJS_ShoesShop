import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { storageData } from "../util/storageData";

const UserTemplate = () => {
  const { userReducer } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const user = storageData.getData("userLogin");

  useEffect(() => {
    if (!userReducer && !user) {
      navigate("/login");
    }
  }, [navigate, userReducer]);
  return <Outlet />;
};

export default UserTemplate;
