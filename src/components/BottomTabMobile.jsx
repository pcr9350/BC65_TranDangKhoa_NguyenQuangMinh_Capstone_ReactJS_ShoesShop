import React from 'react'
import { NavLink } from 'react-router-dom'

const BottomTabMobile = () => {
    return (
        <div 
        className='bg-primary text-white d-flex flex-column justify-content-center'
        style={{
            position:'relative',
            zIndex:10,
            width:'100%',
            height:'50px',
            bottom:0,
            left:0
        }}>
            <div className='row justify-content-center px-5'>
                <div className='col-4'>
                    <NavLink to={'/login'} className={'text-white'}>
                        <i className='fa fa-user fs-1'></i>
                    </NavLink>
                </div>
                <div className='col-4' >
                    <NavLink to={'/'} className={'text-white'}>
                        <i className='fa fa-home fs-1'></i>
                    </NavLink>
                </div>
                <div className='col-4'>
                    <NavLink to={'/cart'} className={'text-white'}>
                        <i className='fa fa-cart-plus fs-1'></i>
                    </NavLink>
                </div>
            </div>
        </div>
      )
}

export default BottomTabMobile