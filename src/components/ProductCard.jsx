import React from "react";
import { NavLink } from "react-router-dom";
import ButtonBuyProduct from "./ButtonBuyProduct";
const ProductCard = (props) => {
  let { product } = props;
  return (
    <div className="card">
      <img src={product.image} alt="..." />
      <div className="card-body text-center">
        <h5>{product.name}</h5>
        <h4>{product.price} $</h4>
        <button className="rounded-5 bg-dark">
          <NavLink
            to={`/detail/${product.id}`}
            className={"text-decoration-none text-white"}
          >
            Chi tiết
          </NavLink>
        </button>
        <ButtonBuyProduct product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
