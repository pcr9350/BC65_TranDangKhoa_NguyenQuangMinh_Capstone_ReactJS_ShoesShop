import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Space, Table } from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { changeInputQuantityItemCartActionAsync, changeQuantityItemCartActionAsync, deleteItemCartActionAsync} from '../../redux/reducers/cartReducer';
import _ from 'lodash';




const Cart = () => {
  // const {ProductCart} = useSelector((state) => state.cartReducer);
  //   const dispatch = useDispatch();
  //   let data = ProductCart;
  //   data = _.orderBy(data,['id']);
    
  return (
    <div></div>
    // <div className="container">
    //   <h3>Cart</h3>
    //   <table className="table">
    //     <thead>
    //       <tr>
    //         <th>ID</th>
    //         <th>Img</th>
    //         <th>Name</th>
    //         <th>Price</th>
    //         <th>Quantity</th>
    //         <th>Total</th>
    //         <th>Action</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {data.map((item, index) => {
    //         return (
    //           <tr key={index}>
    //             <td>{item.id}</td>
    //             <td>
    //               <img
    //                 src={item.image}
    //                 alt={item.name}
    //                 width={50}
    //                 height={50}
    //               />
    //             </td>
    //             <td>{item.name}</td>
    //             <td>{item.price}</td>
    //             <td>
    //               <button
    //                 className="btn btn-success mx-2"
    //                 onClick={() => {
    //                   if (item.quantity < 100) {
    //                     const changeQuantityCartAction =
    //                       changeQuantityItemCartActionAsync(item.id, 1);
    //                     dispatch(changeQuantityCartAction);
    //                   }
    //                 }}
    //               >
    //                 +
    //               </button>
    //               <input
    //                 min={1}
    //                 type="text"
    //                 className="form-control d-inline"
    //                 style={{ width: 100 }}
    //                 value={item.quantity}
    //                 onChange={(e) => {
    //                   let {value} = e.target;
    //                   const regexNumber = /^[1-9][0-9]?$/;
    //                   if (regexNumber.test(value)) {
    //                     const changeInputQuantityCartAction =
    //                       changeInputQuantityItemCartActionAsync(
    //                         item.id,
    //                         Number(value)
    //                       );
    //                     dispatch(changeInputQuantityCartAction);
    //                   } else {
    //                     alert("Nhập từ 1 tới 99");
    //                   }
    //                 }}
    //               />
    //               <button
    //                 className="btn btn-success mx-2"
    //                 onClick={() => {
    //                   if (item.quantity > 1) {
    //                     const changeQuantityCartAction =
    //                       changeQuantityItemCartActionAsync(item.id, -1);
    //                     dispatch(changeQuantityCartAction);
    //                   }
    //                 }}
    //               >
    //                 -
    //               </button>
    //             </td>
    //             <td>{item.quantity * item.price}</td>
    //             <td>
    //               <button
    //                 className="btn btn-danger"
    //                 onClick={() => {
    //                   const deleteItemCartAction = deleteItemCartActionAsync(
    //                     item.id
    //                   );
    //                   dispatch(deleteItemCartAction);
    //                 }}
    //               >
    //                 <i className="fa fa-trash"></i>
    //               </button>
    //             </td>
    //           </tr>
    //         );
    //       })}
    //     </tbody>
    //   </table>
    //   <div style={{display:'flex', justifyContent: 'flex-end'}}>
    //     <button className="btn btn-warning" style={{marginLeft: 0}}>Submit Order</button>
    //   </div>
      
    // </div>
  );
}

export default Cart