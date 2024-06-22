// import React from 'react'
// import {useFormik} from 'formik'
// import * as yup from 'yup'
// import { loginApiActionAsync } from '../../redux/reducers/userReducer'
// import { useDispatch } from 'react-redux'

// const Login = () => {
//   const dispatch = useDispatch();
//   const frmLogin = useFormik({
//     initialValues:{
//       email:'',
//       password:''
//     },
//     validationSchema: yup.object().shape({
//       email: yup.string().required('Email cannot be blank').email('Email is invalid'),
//       password: yup.string().required('Password cannot be blank')
//     }),
//     onSubmit: (userLogin) =>{
//       // console.log(userLogin)
//       const actionAsync = loginApiActionAsync(userLogin);
//       dispatch(actionAsync);
//     }
//   })
//   return (
//     <div className='container'>
//       <form onSubmit={frmLogin.handleSubmit} className='w-50 mx-auto '>
//         <h3>Login</h3>
//         <div className="form-group">
//         <label htmlFor='email'>Email: </label>
//         <input className='form-control mt-2' name='email' id='email' onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur} />
//         {frmLogin.errors.email && <p className='text text-danger'>{frmLogin.errors.email}</p>}
//         </div>
//         <div className="form-group">
//         <label htmlFor='password mt-2'>Password:</label>
//         <input className='form-control mt-2' type='password' name='password' id='password' onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur} />
//         {frmLogin.errors.password && <p className='text text-danger'>{frmLogin.errors.password}</p>}
//         </div>
//         <div className="form-group">
//           <button className='btn btn-success mt-2' type='submit' disabled={!frmLogin.isValid}>Login</button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default Login
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginApiActionAsync } from '../../redux/reducers/userReducer';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const frmLogin = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email không được để trống').email('Email không hợp lệ'),
      password: yup.string().required('Mật khẩu không được để trống')
    }),
    onSubmit: async (userLogin) => {
      try {
        const response = await dispatch(loginApiActionAsync(userLogin));
        // Handle successful login based on your API response structure
        if (response.success) {
          navigate('/');
        } else {
          // Extract and display error message from response (if available)
          const errorMessage = response.error?.message || 'Login failed';
          alert(`Login failed: ${errorMessage}`);
          // Optionally, dispatch an action to update UI with error message
          // dispatch(setErrorMessage(errorMessage));
        }
      } catch (error) {
        // console.error('Login failed:', error);
        // Optionally, dispatch an action to update UI with a generic error message
        // dispatch(setErrorMessage('An unexpected error occurred'));
      }
    },
  });

  return (
    <div className='container'>
      
      <form onSubmit={frmLogin.handleSubmit} className='w-50 mx-auto'>
      <p className='p--title text-center mt-2'>Đăng nhập</p>
        <div className="form-group">
          <label htmlFor='email'>Email: </label>
          <input
            className='form-control mt-2'
            name='email'
            id='email'
            onChange={frmLogin.handleChange}
            onBlur={frmLogin.handleBlur}
            value={frmLogin.values.email}
          />
          {frmLogin.touched.email && frmLogin.errors.email && (
            <p className='text text-danger'>{frmLogin.errors.email}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor='password'>Mật khẩu:</label>
          <input
            className='form-control mt-2'
            type='password'
            name='password'
            id='password'
            onChange={frmLogin.handleChange}
            onBlur={frmLogin.handleBlur}
            value={frmLogin.values.password}
          />
          {frmLogin.touched.password && frmLogin.errors.password && (
            <p className='text text-danger'>{frmLogin.errors.password}</p>
          )}
        </div>
        <div className="form-group">
          <button
            className='btn btn-primary mt-2 rounded-5'
            style={{width: 120}}
            type='submit'
            disabled={!frmLogin.isValid || frmLogin.isSubmitting}
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
