import React from 'react'
import { ACCESS_TOKEN } from '../util/util';

import { useDispatch } from 'react-redux';
import { addProductToCart } from '../redux/reducers/cartReducer';

const ButtonBuyProduct = (props) => {
    const product = {...props.product, count:1};
    const dispatch = useDispatch();
  return (
    <button className='rounded-5 border-0 text-white mx-2' style={{width: 90}} onClick={()=> {
        const checkLogin = localStorage.getItem(ACCESS_TOKEN);
        if (checkLogin) {
        const actionBuyAsync = addProductToCart(product)
          dispatch(actionBuyAsync);
        } else {
          alert("Please Login to buy shoes");
        }
        
      }}>Buy now</button>
  )
}

export default ButtonBuyProduct