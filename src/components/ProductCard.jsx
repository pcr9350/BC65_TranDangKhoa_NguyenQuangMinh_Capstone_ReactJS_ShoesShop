import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import ButtonBuyProduct from './ButtonBuyProduct';

const ProductCard = (props) => {
  let {product} = props;
  const dispatch = useDispatch();
  return (
    <div className='card text-center border-secondary' >
        <img src={product.image} alt="..." />
        <div className="card-body">
            <h5 className='card-title'>{product.name}</h5>
            <p className='card-text'>{product.price} $</p>
            <div className="d-flex">
            <NavLink to={`/detail/${product.id}`} className={'btn btn-dark mx-2'}>View Detail</NavLink>
            <ButtonBuyProduct product={product}/>
        </div>
            
        </div>
        
    </div>
  )
}

export default ProductCard