import React, { useState } from 'react'
import useDataHome from '../pages/Home/useDataHome';
import { Carousel } from 'antd';
import ButtonBuyProduct from './ButtonBuyProduct';
const CarouselHome = () => {
    
    const { data } = useDataHome();
    return (
        <Carousel autoplay className='mt-2'>
          {data?.slice(0,18).map((item, index) => {
           return (
             <div key={index} className="d-flex carousel-div">
               <img src={item.image} alt="" className="w-50" height={450}/>

               <div className="d-flex flex-column info">
                 <h3 className="text-center">{item.name}</h3>
                 <p>{item.description}</p>
                 <h3 className="text-center bg-dark text-white rounded-5">{item.price} $</h3>
                 <div className='d-flex justify-content-end'>  
                 <ButtonBuyProduct product={item}/>
                 </div>
                   
                 
               </div>
             </div>
           );
          })}
  </Carousel>
    );
}

export default CarouselHome

