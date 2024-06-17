import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductActionApi } from '../../redux/reducers/productReducer'
import ProductCard from '../../components/ProductCard'
import useDataHome from './useDataHome'
import { Carousel } from 'antd';
import ButtonBuyProduct from '../../components/ButtonBuyProduct'

// css carousel antd:
const contentStyle = {
  height: '250px',
  color: '#fff',
  // lineHeight: '250px',
  // textAlign: 'center',
  background: '#364d79',
};

const Home = () => {
  const { data } = useDataHome();
  // let item1
  // if(data.length > 0) {
  //   item1 = data[0];
  //   console.log(item1.image)
  // }
  
  return (
    <div className='container'>
        <Carousel autoplay className='mt-2' >
          {data?.map((item, index) => {
            // return <div key={index}>
            //   <div className="col-8">
            //   <img src={item.image} alt="..." height={250} width={250}/>
            //   </div>
              
            //   <div className="col-4">
            //     <h4>{item.name}</h4>
            //     <p>{item.price}</p>
            //     <button className='btn btn-warning'>Buy now</button>
            //   </div>
            // </div>
           return (
             <div key={index} className="d-flex bg-info bg-opacity-50">
               <img src={item.image} alt="" className="w-25" />

               <div className="d-flex flex-column info">
                 <h3 className="text-center">{item.name}</h3>
                 <p>{item.description}</p>
                 <p className="text-center bg-danger w-25">{item.price} $</p>
                 <div className="w-25">
                   <ButtonBuyProduct product={item} className="w-25" />
                 </div>
               </div>
             </div>
           );
          })}
    {/* <div>
      
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div> */}
  </Carousel>

        
        <h3>Product list</h3>
        <div className='row'>
        {data.map((item,index)=>{
            return <div className='col-3 mt-2' key={index}>
                    <ProductCard product={item} />
            </div> 
        })}
        </div>
    </div>
  )
}

export default Home