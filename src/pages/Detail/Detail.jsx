import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailProductActionApi } from "../../redux/reducers/productReducer";
import ProductCard from "../../components/ProductCard";
import toast from "react-hot-toast";
import { addProductToCart } from "../../redux/reducers/cartReducer";
import UpDownActions from "../../components/UpDownActions";

const Detail = () => {
  const params = useParams();
  const { id } = params;
  const { productDetail } = useSelector((state) => state.productReducer);

  const [currentProduct, setCurrentProduct] = useState([]);

  useEffect(() => {
    setCurrentProduct({ ...productDetail, count: 0 });
  }, [productDetail]);

  const dispatch = useDispatch();

  const getDetailProduct = async () => {
    const actionAsync = getDetailProductActionApi(id);
    dispatch(actionAsync);
  };

  useEffect(() => {
    getDetailProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (currentProduct.count === 0) return;
    dispatch(addProductToCart(currentProduct));
    toast.success("Add to cart successfully!");

    // reset count in product
    setCurrentProduct({ ...currentProduct, count: 0 });
  };

  const handleUpDownBtn = (type) => {
    if (type === "up") {
      if (currentProduct.count === 10) return; // add maximum 10
      setCurrentProduct({ ...currentProduct, count: currentProduct.count + 1 });
    } else {
      if (product.count === 0) return;
      setCurrentProduct({ ...currentProduct, count: currentProduct.count - 1 });
    }
  };

  return (
    <div className="container">
      <h3>Detail Page - {id}</h3>
      <div className="row">
        <div className="col-4">
          <img src={productDetail?.image} alt="..." className="w-100" />
        </div>
        <div className="col-8">
          <h3>{productDetail?.name}</h3>
          <p>{productDetail?.description}</p>
          {productDetail?.size.map((size, index) => {
            return (
              <button className="me-2 btn btn-dark" key={index}>
                {size}
              </button>
            );
          })}
          <div className="mt-5 d-flex flex-column align-items-start gap-2">
            <UpDownActions
              product={currentProduct}
              handleUpDownBtn={handleUpDownBtn}
            />
            <button
              className={`btn btn-dark ${!currentProduct?.count && "disabled"}`}
              style={{ width: 130 }}
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <h3>Related Product</h3>
        <div className="row">
          {productDetail?.relatedProducts.map((prod, index) => {
            return (
              <div className="col-4" key={index}>
                <ProductCard product={prod} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;
