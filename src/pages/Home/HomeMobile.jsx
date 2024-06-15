import useDataHome from './useDataHome'
import { NavLink } from 'react-router-dom';

const HomeMobile = () => {
  const {data} = useDataHome();
  return (
    <div className='container'>
            <h3>Shoes Shop</h3>
            {data?.map((prod,index)=>{
                return <div className='d-flex mt-2' key={index}>
                    <img className='w-25' src={prod.image} alt='...' />
                    <div className='info d-flex flex-column'>
                        <div>
                            <h3>{prod.name}</h3>
                            <p>{prod.shortDescription}</p>
                        </div>
                        <div className='text-end'>
                            <NavLink to={`/detail/${prod.id}`} className={'btn btn-dark'}>View detail</NavLink>
                        </div>
                    </div>
                </div>
            })}
        </div>
  )
}

export default HomeMobile