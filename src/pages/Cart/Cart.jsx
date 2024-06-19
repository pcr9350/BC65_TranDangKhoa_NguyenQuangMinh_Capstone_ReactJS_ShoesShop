// import React, { useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import UpDownActions from "../../components/UpDownActions";
// import {
//   cartDown,
//   cartUp,
//   removeProductToCard,
// } from "../../redux/reducers/cartReducer";

// const Cart = () => {
//   const { products } = useSelector((state) => state.cartReducer);
//   const dispatch = useDispatch();

//   const [productSelected, setProductSelected] = useState([]);

 

//   const handleRemoveProductInCart = (id) => {
//     //  alert confirm
//     if (confirm("Are you sure you want to remove this product?"))
//       dispatch(removeProductToCard(id));
//   };

//   const handleUpDownBtn = (type, product) => {
//     if (type === "up") {
//       if (product.count === 10) return; // add maximum 10
//       dispatch(cartUp(product.id));
//     } else {
//       if (product.count === 1) return handleRemoveProductInCart(product.id);
//       dispatch(cartDown(product.id));
//     }
//   };

//   const handleCheck = (product) => {
//     if (
//       productSelected.find((currentProduct) => product.id === currentProduct.id)
//     )
//       setProductSelected(
//         productSelected.filter(
//           (currentProduct) => currentProduct.id !== product.id
//         )
//       );
//     else setProductSelected([...productSelected, product]);
//   };

//   const handleOrder = () => {
//     console.log(123);
//   };

//   const totalPrice = useMemo(() => {
//     if (!productSelected || productSelected.length === 0) {
//       return 0; 
//     }
    
//     const p1 =  products.reduce((acc, p) => acc + (p?.price || 0) * (p?.count || 0), 0);
//     const p2 =  productSelected.reduce((acc, p) => acc + (p?.price || 0) * (p?.count || 0), 0);

//     return p2

//   }, [productSelected, products]);

//   console.log(totalPrice)
//   return (
//     <div>
//       <h1>Cart</h1>
//       <hr />
//       <div className="position-relative container">
//         <table className="table mx-5">
//           <thead className="thead-dark">
//             <tr>
//               <th scope="col">
//                 <input
//                   type="checkbox"
//                   checked={productSelected.length > 0}
//                   onChange={() =>
//                     setProductSelected(!productSelected.length ? products : [])
//                   }
//                 />
//               </th>
//               <th scope="col">id</th>
//               <th scope="col">image</th>
//               <th scope="col">name</th>
//               <th scope="col">price</th>
//               <th scope="col">quantity</th>
//               <th scope="col">total</th>
//               <th scope="col">action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products?.map((product) => (
//               <tr key={product?.id}>
//                 <th>
//                   <input
//                     type="checkbox"
//                     onChange={() => handleCheck(product)}
//                     checked={productSelected.find(
//                       (currentProduct) => currentProduct.id === product.id
//                     )}
//                   />
//                 </th>
//                 <th>{product?.id}</th>
//                 <th>
//                   <img src={product?.image} width={50} />
//                 </th>
//                 <th>{product?.name}</th>
//                 <th>{product?.price}</th>
//                 <th>
//                   <UpDownActions
//                     key={product.id}
//                     product={product}
//                     handleUpDownBtn={(type) => handleUpDownBtn(type, product)}
//                   />
//                 </th>
//                 <th>{product?.price *product?.count}</th>
//                 <th className="">
//                   {/* <button
//                     className={`btn  ${
//                       !productSelected.find(
//                         (currentProduct) => currentProduct.id === product.id
//                       ) && "disabled"
//                     }`}
//                     style={{
//                       marginRight: 5,
//                       background: "purple",
//                       color: "white",
//                     }}
//                   >
//                     Edit
//                   </button> */}
//                   <button
//                     className={`btn btn-danger `}
//                     onClick={() => handleRemoveProductInCart(product.id)}
//                   >
//                     Delete
//                   </button>
//                 </th>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div>Total price: {totalPrice}</div>

//         <button
//           className={`btn right-0 border-0 p-2 rounded-2 ${
//             !productSelected?.length > 0 && "disabled"
//           }`}
//           style={{
//             color: "white",
//             background: "orange",
//             position: "absolute",
//             right: "10%",
//           }}
//           onClick={handleOrder}
//         >
//           Submit order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;

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
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?"))
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
    if(confirm("Bạn vui lòng xác nhận đơn hàng muốn mua ?")) {
      const actionOrder = addOrderActionAsync(orderSubmit);
      dispatch(actionOrder);
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
