import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductActionApi } from "../../redux/reducers/productReducer";
import ProductCard from "../../components/ProductCard";
import useDataHome from "./useDataHome";

const Home = () => {
  const { data } = useDataHome();
  // let item1
  // if(data.length > 0) {
  //   item1 = data[0];
  //   console.log(item1.image)
  // }
  
  return (
    <div className="container">
      <h3>Product list</h3>
      <div className="row">
        {data.map((item, index) => {
          return (
            <div className="col-3 mt-2" key={index}>
              <ProductCard product={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
