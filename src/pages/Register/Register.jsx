import React from 'react'
import {  QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { userApi } from '../../services/apiStore/user/userApi'
import * as yup from 'yup'
import { routeLink } from '../../App'

const Register = () => {
  const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['addUserApi'],
        mutationFn: userApi.addUser,
        onSuccess: (res) => {{
            // Xử lý sau khi success api
            routeLink.push('/login');
            // queryClient.invalidateQueries('storeListApi');
        }}
    });


    const frmRegisterUser = useFormik({
      initialValues: {
        name:'',
        email:'',
        password:'',
        phone:'',
        gender:true
      },
      validationSchema: yup.object().shape({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email format').required('Email is required'),
      password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      phone: yup.string().required('Phone number is required'), // Adjust validation if needed
      gender: yup.boolean().oneOf([true, false], 'Gender is required'),
      }),
      onSubmit: (values) => {
       // Lấy dữ liệu từ form thành công
            mutation.mutateAsync(values);
      }
    })
  return (
    <form className='container' onSubmit={frmRegisterUser.handleSubmit}>
        <h3>Create user</h3>
        <div className='w-75 mx-auto'>
        <div className='form-group'>
          <label>Name</label>
          <input className='form-control' name="name" onChange={frmRegisterUser.handleChange} onBlur={frmRegisterUser.handleBlur}/>
          {frmRegisterUser.errors.name && <div className="text-danger">{frmRegisterUser.errors.name}</div>}
        </div>
        <div className='form-group'>
          <label>Email</label>
          <input className='form-control' name="email" onChange={frmRegisterUser.handleChange} onBlur={frmRegisterUser.handleBlur}/>
          {frmRegisterUser.errors.email && <div className="text-danger">{frmRegisterUser.errors.email}</div>}
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input type='password' className='form-control' name="password" onChange={frmRegisterUser.handleChange} onBlur={frmRegisterUser.handleBlur}/>
          {frmRegisterUser.errors.password && <div className="text-danger">{frmRegisterUser.errors.password}</div>}
        </div>
        <div className='form-group me-2 my-2'>
          <label className='me-2'>Gender:</label>
          <div>
            <label htmlFor="male">Male</label>
            <input id="male" value={true} type='radio' className='form-check-input mx-2' name="gender" onChange={frmRegisterUser.handleChange} onBlur={frmRegisterUser.handleBlur}/>
          </div>
          <div>
            <label htmlFor="female">Female</label>
            <input id='female' value={false} type='radio' className='form-check-input mx-2' name="gender" onChange={frmRegisterUser.handleChange} onBlur={frmRegisterUser.handleBlur}/>
          </div>
          {frmRegisterUser.errors.gender && <div className="text-danger">{frmRegisterUser.errors.gender}</div>}
        </div>
        <div className='form-group'>
          <label>Phone</label>
          <input className='form-control' name="phone" onChange={frmRegisterUser.handleChange} onBlur={frmRegisterUser.handleBlur}/>
          {frmRegisterUser.errors.phone && <div className="text-danger">{frmRegisterUser.errors.phone}</div>}
        </div>
          <div className='form-group'>
            <button className='btn btn-dark mt-2' type="submit" disabled={!frmRegisterUser.isValid}>Create User</button>
          </div>
        </div>
      </form>
  )
}

export default Register