import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpDownActions from "../../components/UpDownActions";
import {
  cartDown,
  cartUp,
  removeProductToCard,
} from "../../redux/reducers/cartReducer";

const Cart = () => {
  const { products } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const [productSelected, setProductSelected] = useState([]);

  const handleUpDownBtn = (type, product) => {
    if (type === "up") {
      if (product.count === 10) return; // add maximum 10
      dispatch(cartUp(product.id));
    } else {
      if (product.count === 1) return;
      dispatch(cartDown(product.id));
    }
  };

  const handleRemoveProductInCart = (id) => {
    //  alert confirm
    if (confirm("Are you sure you want to remove this product?"))
      dispatch(removeProductToCard(id));
  };

  const handleCheck = (product) => {
    if (
      productSelected.find((currentProduct) => product.id === currentProduct.id)
    )
      setProductSelected(
        productSelected.filter(
          (currentProduct) => currentProduct.id !== product.id
        )
      );
    else setProductSelected([...productSelected, product]);
  };

  const handleOrder = () => {
    console.log(123);
  };

  return (
    <div>
      <h1>Cart</h1>
      <hr />
      <div className="position-relative container">
        <table className="table mx-5">
          <thead className="thead-dark">
            <tr>
              <th scope="col">
                <input
                  type="checkbox"
                  checked={productSelected.length > 0}
                  onChange={() =>
                    setProductSelected(!productSelected.length ? products : [])
                  }
                />
              </th>
              <th scope="col">id</th>
              <th scope="col">image</th>
              <th scope="col">name</th>
              <th scope="col">price</th>
              <th scope="col">quantity</th>
              <th scope="col">total</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product?.id}>
                <th>
                  <input
                    type="checkbox"
                    onChange={() => handleCheck(product)}
                    checked={productSelected.find(
                      (currentProduct) => currentProduct.id === product.id
                    )}
                  />
                </th>
                <th>{product?.id}</th>
                <th>
                  <img src={product?.image} width={50} />
                </th>
                <th>{product?.name}</th>
                <th>{product?.price}</th>
                <th>
                  <UpDownActions
                    key={product.id}
                    product={product}
                    handleUpDownBtn={(type) => handleUpDownBtn(type, product)}
                  />
                </th>
                <th>{product?.total}</th>
                <th className="">
                  {/* <button
                    className={`btn  ${
                      !productSelected.find(
                        (currentProduct) => currentProduct.id === product.id
                      ) && "disabled"
                    }`}
                    style={{
                      marginRight: 5,
                      background: "purple",
                      color: "white",
                    }}
                  >
                    Edit
                  </button> */}
                  <button
                    className={`btn btn-danger ${
                      !productSelected.find(
                        (currentProduct) => currentProduct.id === product.id
                      ) && "disabled"
                    }`}
                    onClick={() => handleRemoveProductInCart(product.id)}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className={`btn right-0 border-0 p-2 rounded-2 ${
            !productSelected?.length > 0 && "disabled"
          }`}
          style={{
            color: "white",
            background: "orange",
            position: "absolute",
            right: "10%",
          }}
          onClick={handleOrder}
        >
          Submit order
        </button>
      </div>
    </div>
  );
};

export default Cart;
