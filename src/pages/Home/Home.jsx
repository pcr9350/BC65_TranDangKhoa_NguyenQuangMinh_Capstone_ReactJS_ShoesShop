import React from "react";
import ProductCard from "../../components/ProductCard";
import useDataHome from "./useDataHome";
import CarouselHome from "../../components/Carousel";

const Home = () => {
  const { data } = useDataHome();

  return (
    <div className="container">
      <CarouselHome />
      <p className="p--title">Danh sách sản phẩm</p>
      <div className="row">
        {data.map((item, index) => {
          return (
            <div className="col-sm-6 col-md-4 col-lg-3 mt-2" key={index}>
              <ProductCard product={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
