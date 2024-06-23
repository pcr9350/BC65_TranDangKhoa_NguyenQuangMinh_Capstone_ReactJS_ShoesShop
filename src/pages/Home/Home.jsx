import React from "react";
import ProductCard from "../../components/ProductCard";
import useDataHome from "./useDataHome";
import CarouselHome from "../../components/Carousel";

const Home = () => {
  const { data } = useDataHome();

  return (
    <div className="container">
      <CarouselHome />
      <p className="p--title">Product list</p>
      <div className="row">
        {data.map((item, index) => {
          return (
            <div className="col-lg-3 col-md-4 col-sm-6 mt-2" key={index}>
              <ProductCard product={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
