// import React from 'react'
// import { ACCESS_TOKEN } from '../util/util';

// import { useDispatch } from 'react-redux';
// import { addItemCartActionAsync } from '../redux/reducers/cartReducer';

// const ButtonBuyProduct = (props) => {
//     const product = props.product;
//     const dispatch = useDispatch();
//   return (
//     <button className='btn btn-warning' onClick={()=> {
//         const checkLogin = localStorage.getItem(ACCESS_TOKEN);
//         if (checkLogin) {
//           const actionBuyAsync = addItemCartActionAsync(product);
//           dispatch(actionBuyAsync);
//         } else {
//           alert("Please Login to buy shoes");
//         }
        
//       }}>Buy now</button>
//   )
// }

// export default ButtonBuyProduct