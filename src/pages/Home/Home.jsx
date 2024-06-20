import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import useDataHome from "./useDataHome";
import CarouselHome from "../../components/Carousel";

const Home = () => {
  const { data } = useDataHome();
  
  return (
    <div className="container">
      <CarouselHome />
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




