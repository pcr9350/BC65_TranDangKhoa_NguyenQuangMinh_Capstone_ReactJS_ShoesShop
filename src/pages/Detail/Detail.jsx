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
  const { userLogin } = useSelector((state) => state.userReducer);
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
    if (userLogin) {
      dispatch(addProductToCart(currentProduct));
      toast.success("Add to cart successfully!");

      // reset count in product
      setCurrentProduct({ ...currentProduct, count: 0 });
    } else toast.error("Vui lòng đăng nhập để mua hàng");
  };

  const handleUpDownBtn = (type) => {
    if (type === "up") {
      if (currentProduct.count === 10) return; // add maximum 10
      setCurrentProduct({ ...currentProduct, count: currentProduct.count + 1 });
    } else {
      if (currentProduct.count === 0) return;
      setCurrentProduct({ ...currentProduct, count: currentProduct.count - 1 });
    }
  };

  return (
    <div className="container">
      <p className="p--title mt-2">Detail Shoes ID: {id}</p>
      <div className="row">
        <div className="col-4">
          <img src={productDetail?.image} alt="..." className="w-100" />
        </div>
        <div className="col-8">
          <h3>{productDetail?.name}</h3>
          <p>{productDetail?.description}</p>
          {productDetail?.size.map((size, index) => {
            return (
              <p className="me-2 btn btn-dark rounded-5" key={index}>
                {size}
              </p>
            );
          })}
          <div className="mt-2 d-flex flex-column align-items-start gap-2">
            <div className="w-50">
            <UpDownActions
              product={currentProduct}
              handleUpDownBtn={handleUpDownBtn}
            />
            </div>
            
            <button
              className={`btn rounded-5 ${
                !currentProduct?.count && "disabled"
              }`}
              style={{ backgroundColor: "#6200EE", color: "white" }}
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="mt-1">
        <p className="p--title">Related Product</p>
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
