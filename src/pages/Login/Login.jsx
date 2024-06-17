import React from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { loginApiActionAsync } from '../../redux/reducers/userReducer'
import { useDispatch } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch();
  const frmLogin = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email cannot be blank').email('Email is invalid'),
      password: yup.string().required('Password cannot be blank')
    }),
    onSubmit: (userLogin) =>{
      // console.log(userLogin)
      const actionAsync = loginApiActionAsync(userLogin);
      dispatch(actionAsync);
    }
  })
  return (
    <div className='container'>
      <form onSubmit={frmLogin.handleSubmit} className='w-50 mx-auto '>
        <h3>Login</h3>
        <div className="form-group">
        <label htmlFor='email'>Email: </label>
        <input className='form-control mt-2' name='email' id='email' onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur} />
        {frmLogin.errors.email && <p className='text text-danger'>{frmLogin.errors.email}</p>}
        </div>
        <div className="form-group">
        <label htmlFor='password mt-2'>Password:</label>
        <input className='form-control mt-2' type='password' name='password' id='password' onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur} />
        {frmLogin.errors.password && <p className='text text-danger'>{frmLogin.errors.password}</p>}
        </div>
        <div className="form-group">
          <button className='btn btn-success mt-2' type='submit' disabled={!frmLogin.isValid}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login