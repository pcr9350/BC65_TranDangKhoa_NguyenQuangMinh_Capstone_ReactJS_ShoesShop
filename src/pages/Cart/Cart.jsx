import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpDownActions from "../../components/UpDownActions";
import {
  addOrderActionAsync,
  cartDown,
  cartUp,
  removeProductToCard,
} from "../../redux/reducers/cartReducer";

const Cart = () => {
  const { products } = useSelector((state) => state.cartReducer);
  const { userLogin } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [productSelected, setProductSelected] = useState([]);

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
        quantity: product.count
      })),
      email: emailOrder
    };
    if (window.confirm("Bạn vui lòng xác nhận đơn hàng muốn mua ?")) {
      const actionOrder = addOrderActionAsync(orderSubmit);
      dispatch(actionOrder);
      // Sau khi đặt hàng thành công, xoá toàn bộ sản phẩm trong giỏ hàng
      products.forEach((product) => {
        dispatch(removeProductToCard(product.id));
      });
      // Đặt lại sản phẩm được chọn về rỗng
      setProductSelected([]);
    }
  };

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
      prevSelected.length === products.length ? [] : products
    );
  };

  return (
    <div>
      <h1>Giỏ hàng</h1>
      <hr />
      <div className="position-relative container">
        <table className="table mx-5">
          <thead className="thead-dark">
            <tr>
              <th scope="col">
                <input
                  type="checkbox"
                  checked={productSelected.length === products.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th scope="col">ID</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Giá</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Tổng</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <th>
                  <input
                    type="checkbox"
                    onChange={() => handleCheck(product)}
                    checked={productSelected.some(
                      (currentProduct) => currentProduct.id === product.id
                    )}
                  />
                </th>
                <th>{product.id}</th>
                <th>
                  <img src={product.image} width={50} alt={product.name} />
                </th>
                <th>{product.name}</th>
                <th>{product.price}</th>
                <th>
                  <UpDownActions
                    key={product.id}
                    product={product}
                    handleUpDownBtn={(type) => handleUpDownBtn(type, product)}
                  />
                </th>
                <th>{product.price * product.count}</th>
                <th>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveProductInCart(product.id)}
                  >
                    Xóa
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

        <div>Tổng giá: {totalPrice}</div>

        <button
          className={`btn border-0 p-2 rounded-2 ${
            productSelected.length === 0 && "disabled"
          }`}
          style={{
            color: "white",
            background: "orange",
            position: "absolute",
            right: "10%",
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
