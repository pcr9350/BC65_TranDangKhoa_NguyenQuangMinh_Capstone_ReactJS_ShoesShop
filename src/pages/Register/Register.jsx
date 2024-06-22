// import React from 'react'
// import {  QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useFormik } from 'formik'
// import { userApi } from '../../services/apiStore/user/userApi'
// import * as yup from 'yup'
// import { routeLink } from '../../App'

// const Register = () => {
//   const queryClient = useQueryClient();
//     const mutation = useMutation({
//         mutationKey: ['addUserApi'],
//         mutationFn: userApi.addUser,
//         onSuccess: (res) => {{
//             // Xử lý sau khi success api
//             routeLink.push('/login');
//             // queryClient.invalidateQueries('storeListApi');
//         }}
//     });


//     const frmRegisterUser = useFormik({
//       initialValues: {
//         name:'',
//         email:'',
//         password:'',
//         phone:'',
//         gender:true
//       },
//       validationSchema: yup.object().shape({
//       name: yup.string().required('Name is required'),
//       email: yup.string().email('Invalid email format').required('Email is required'),
//       password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//       phone: yup.string().required('Phone number is required'), // Adjust validation if needed
//       gender: yup.boolean().oneOf([true, false], 'Gender is required'),
//       }),
//       onSubmit: (values) => {
//        // Lấy dữ liệu từ form thành công
//             mutation.mutateAsync(values);
//       }
//     })
//   return (
//     <form className='container' onSubmit={frmRegisterUser.handleSubmit}>
//         <h3>Create user</h3>
//         <div className='w-75 mx-auto'>
//         <div className='form-group'>
//           <label>Name</label>
//           <input className='form-control' name="name" onChange={frmRegisterUser.handleChange} onBlur={frmRegisterUser.handleBlur}/>
//           {frmRegisterUser.errors.name && <div className="text-danger">{frmRegisterUser.errors.name}</div>}
//         </div>
//         <div className='form-group'>
//           <label>Email</label>
//           <input className='form-control' name="email" onChange={frmRegisterUser.handleChange} onBlur={frmRegisterUser.handleBlur}/>
//           {frmRegisterUser.errors.email && <div className="text-danger">{frmRegisterUser.errors.email}</div>}
//         </div>
//         <div className='form-group'>
//           <label>Password</label>
//           <input type='password' className='form-control' name="password" onChange={frmRegisterUser.handleChange} onBlur={frmRegisterUser.handleBlur}/>
//           {frmRegisterUser.errors.password && <div className="text-danger">{frmRegisterUser.errors.password}</div>}
//         </div>
//         <div className='form-group me-2 my-2'>
//           <label className='me-2'>Gender:</label>
//           <div>
//             <label htmlFor="male">Male</label>
//             <input id="male" value={true} type='radio' className='form-check-input mx-2' name="gender" onChange={frmRegisterUser.handleChange} onBlur={frmRegisterUser.handleBlur}/>
//           </div>
//           <div>
//             <label htmlFor="female">Female</label>
//             <input id='female' value={false} type='radio' className='form-check-input mx-2' name="gender" onChange={frmRegisterUser.handleChange} onBlur={frmRegisterUser.handleBlur}/>
//           </div>
//           {frmRegisterUser.errors.gender && <div className="text-danger">{frmRegisterUser.errors.gender}</div>}
//         </div>
//         <div className='form-group'>
//           <label>Phone</label>
//           <input className='form-control' name="phone" onChange={frmRegisterUser.handleChange} onBlur={frmRegisterUser.handleBlur}/>
//           {frmRegisterUser.errors.phone && <div className="text-danger">{frmRegisterUser.errors.phone}</div>}
//         </div>
//           <div className='form-group'>
//             <button className='btn btn-dark mt-2' type="submit" disabled={!frmRegisterUser.isValid}>Create User</button>
//           </div>
//         </div>
//       </form>
//   )
// }

// export default Register
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { userApi } from '../../services/apiStore/user/userApi';
import { routeLink } from '../../App';

const Register = () => {
  const queryClient = useQueryClient();

  // Sử dụng useMutation để thực hiện thao tác thêm người dùng mới
  const mutation = useMutation({
    mutationKey: ['addUserApi'], // Khóa của mutation
    mutationFn: userApi.addUser, // Hàm thực hiện API để thêm người dùng
    onSuccess: (res, variables, context) => {
      // Xử lý sau khi API thành công
      routeLink.push('/login'); // Chuyển hướng người dùng đến trang đăng nhập
      frmRegisterUser.resetForm(); // Reset form sau khi đăng ký thành công
    },
  });

  // Sử dụng Formik để quản lý form và xác thực
  const frmRegisterUser = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      gender: true,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email format').required('Email is required'),
      password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      phone: yup.string()
        .matches(/^[0-9]+$/, 'Phone number must be digits only')
        .required('Phone number is required'),
      gender: yup.boolean().oneOf([true, false], 'Gender is required'),
    }),
    onSubmit: (values) => {
      // Gọi mutation để thực hiện thêm người dùng mới
      mutation.mutateAsync(values);
    },
  });

  return (
    <form className='container' onSubmit={frmRegisterUser.handleSubmit}>
      
      <div className='w-50 mx-auto mt-2'>
      <p className='p--title text-center'>Đăng ký</p>
        <div className='form-group'>
          <label>Name</label>
          <input
            className='form-control'
            name='name'
            value={frmRegisterUser.values.name}
            onChange={frmRegisterUser.handleChange}
            onBlur={frmRegisterUser.handleBlur}
          />
          {frmRegisterUser.errors.name && <div className='text-danger'>{frmRegisterUser.errors.name}</div>}
        </div>
        <div className='form-group'>
          <label>Email</label>
          <input
            className='form-control'
            name='email'
            value={frmRegisterUser.values.email}
            onChange={frmRegisterUser.handleChange}
            onBlur={frmRegisterUser.handleBlur}
          />
          {frmRegisterUser.errors.email && <div className='text-danger'>{frmRegisterUser.errors.email}</div>}
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            name='password'
            value={frmRegisterUser.values.password}
            onChange={frmRegisterUser.handleChange}
            onBlur={frmRegisterUser.handleBlur}
          />
          {frmRegisterUser.errors.password && (
            <div className='text-danger'>{frmRegisterUser.errors.password}</div>
          )}
        </div>
        <div className='form-group me-2 my-2'>
          <label className='me-2'>Gender:</label>
          
            <label htmlFor='male'>Male</label>
            <input
              id='male'
              value={true}
              type='radio'
              className='form-check-input mx-2'
              name='gender'
              checked={frmRegisterUser.values.gender === true}
              onChange={frmRegisterUser.handleChange}
              onBlur={frmRegisterUser.handleBlur}
            />
          
          
            <label htmlFor='female'>Female</label>
            <input
              id='female'
              value={false}
              type='radio'
              className='form-check-input mx-2'
              name='gender'
              checked={frmRegisterUser.values.gender === false}
              onChange={frmRegisterUser.handleChange}
              onBlur={frmRegisterUser.handleBlur}
            />
          
          {frmRegisterUser.errors.gender && (
            <div className='text-danger'>{frmRegisterUser.errors.gender}</div>
          )}
        </div>
        <div className='form-group'>
          <label>Phone</label>
          <input
            className='form-control'
            name='phone'
            value={frmRegisterUser.values.phone}
            onChange={frmRegisterUser.handleChange}
            onBlur={frmRegisterUser.handleBlur}
          />
          {frmRegisterUser.errors.phone && (
            <div className='text-danger'>{frmRegisterUser.errors.phone}</div>
          )}
        </div>
        <div className='form-group'>
          <button className='btn btn-primary mt-2 rounded-5' style={{width: 120}} type='submit' disabled={!frmRegisterUser.isValid}>
            Đăng ký
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
