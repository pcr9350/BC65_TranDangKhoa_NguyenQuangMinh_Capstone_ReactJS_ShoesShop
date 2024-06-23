import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpDownActions from "../../components/UpDownActions";
import {
  addOrderActionAsync,
  cartDown,
  cartUp,
  removeProductToCard,
  setCartAfterBuy,
} from "../../redux/reducers/cartReducer";
import _ from "lodash";
import { storageData } from "../../util/storageData";

const Cart = () => {
  const { products } = useSelector((state) => state.cartReducer);
  const { userLogin } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [productSelected, setProductSelected] = useState([]);
  let data = _.orderBy(products, ["id"]);
  // Xử lý việc xóa sản phẩm khỏi giỏ hàng với xác nhận
  const handleRemoveProductInCart = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?"))
      dispatch(removeProductToCard(id));
  };

  // Xử lý tăng giảm số lượng sản phẩm
  const handleUpDownBtn = (type, product) => {
    if (type === "up") {
      if (product.count < 10) dispatch(cartUp(product.id)); // Tối đa 10
    } else {
      if (product.count > 1) dispatch(cartDown(product.id));
      else handleRemoveProductInCart(product.id);
    }
  };

  // Xử lý chọn sản phẩm để đặt hàng
  const handleCheck = (product) => {
    setProductSelected((prevSelected) =>
      prevSelected.find((currentProduct) => product.id === currentProduct.id)
        ? prevSelected.filter(
            (currentProduct) => currentProduct.id !== product.id
          )
        : [...prevSelected, product]
    );
  };

  // Xử lý việc đặt đơn hàng
  const handleOrder = () => {
    const emailOrder = userLogin.email;
    const orderSubmit = {
      orderDetail: productSelected.map((product) => ({
        productId: product.id,
        quantity: product.count,
      })),
      email: emailOrder,
    };
    if (window.confirm("Bạn vui lòng xác nhận đơn hàng muốn mua ?")) {
      const actionOrder = addOrderActionAsync(orderSubmit);
      dispatch(actionOrder);
      const filteredProducts = _.difference(data, productSelected);
      const actionSetCartAfterBuy = setCartAfterBuy(filteredProducts);
      dispatch(actionSetCartAfterBuy);
      storageData.setData("userCart", filteredProducts);
    } else return;
  };
  useEffect(() => {}, [storageData]);
  // Tính toán tổng giá của các sản phẩm được chọn
  const totalPrice = useMemo(() => {
    return productSelected.reduce(
      (acc, p) => acc + (p.price || 0) * (p.count || 0),
      0
    );
  }, [productSelected]);

  // Xử lý việc chọn/bỏ chọn tất cả sản phẩm
  const handleSelectAll = () => {
    setProductSelected((prevSelected) =>
      prevSelected.length === data.length ? [] : data
    );
  };

  return (
    <div className="container">
      <p className="p--title mt-2">Giỏ hàng</p>

      <div className="position-relative">
        <table className="table">
          <thead className="thead-dark">
            <tr className="row">
              <th scope="col" className="col-sm-1 ">
                <input
                  type="checkbox"
                  checked={productSelected.length === data.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th scope="col" className="col-sm-1 ">
                ID
              </th>
              <th scope="col" className="col-sm-1 ">
                Hình ảnh
              </th>
              <th scope="col" className="col-sm-2 ">
                Tên sản phẩm
              </th>
              <th scope="col" className="col-sm-1 ">
                Giá
              </th>
              <th scope="col" className="col-sm-3 ">
                Số lượng
              </th>
              <th scope="col" className="col-sm-1 ">
                Tổng
              </th>
              <th scope="col" className="col-sm-2">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id} className="row">
                <th className="col-sm-1">
                  <input
                    type="checkbox"
                    onChange={() => handleCheck(product)}
                    checked={productSelected.some(
                      (currentProduct) => currentProduct.id === product.id
                    )}
                  />
                </th>
                <td className="col-sm-1">{product.id}</td>
                <td className="col-sm-1">
                  <img src={product.image} width={50} alt={product.name} />
                </td>
                <td className="col-sm-2">{product.name}</td>
                <td className="col-sm-1">{product.price} $</td>
                <td className="col-sm-3">
                  <UpDownActions
                    key={product.id}
                    product={product}
                    handleUpDownBtn={(type) => handleUpDownBtn(type, product)}
                  />
                </td>
                <td className="col-sm-1">{product.price * product.count} $</td>
                <td className="col-sm-2">
                  <button
                    className="btn btn-danger rounded-5"
                    style={{ width: 70 }}
                    onClick={() => handleRemoveProductInCart(product.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>Tổng giá: {totalPrice} $</div>

        <button
          className={`btn border-0 p-2 rounded-5 ${
            productSelected.length === 0 && "disabled"
          }`}
          style={{
            color: "white",
            background: "#6200EE",
            position: "absolute",
            right: "0%",
          }}
          onClick={handleOrder}
          disabled={productSelected.length === 0}
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default Cart;
