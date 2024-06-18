import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductActionApi } from "../../redux/reducers/productReducer";

const useDataHome = () => {
  const { arrProduct } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  const getAllProduct = async () => {
    //dispatch action thunk
    const actionAsync = getAllProductActionApi();
    dispatch(actionAsync);
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  const data = arrProduct;
  return {
    data,
  };
};

export default useDataHome;
