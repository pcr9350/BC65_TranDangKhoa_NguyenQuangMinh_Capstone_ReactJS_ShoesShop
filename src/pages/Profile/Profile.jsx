import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileActionAsync } from '../../redux/reducers/userReducer'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../../services/apiStore/user/userApi';
import { useFormik } from 'formik';
import * as yup from 'yup'
const Profile = () => {
  const {userProfile} = useSelector((state) => state.userReducer);
  
  const dispatch = useDispatch();

  const getProfileApi = () => {
    const actionAsync = getProfileActionAsync();
    dispatch(actionAsync);
  };


  // Xử lý update user
  const queryClient = useQueryClient();
    //mutation Update User
    const mutation = useMutation({
        mutationKey: ['updateUserApi'],
        mutationFn: userApi.updateUser,
        onSuccess: (res) => {{
            // Xử lý sau khi success api
            getProfileApi();
            // queryClient.invalidateQueries('storeListApi');
        }}
    });

    //mutation Update Password 
    const mutationUpdatePassword = useMutation({
      mutationKey: ['updatePasswordUserApi'],
      mutationFn: userApi.updatePasswordUser,
      onSuccess: (res) => {{
          // Xử lý sau khi success api
          queryClient.invalidateQueries('updateUserApi');
      }}
  });

    // Dùng formik quản lý frmUpdateUser 
    const frmUpdateUser = useFormik({
      initialValues: {
        name:'',
        email:'',
        phone:'',
        gender:true
      },
      validationSchema: yup.object().shape({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email format').required('Email is required'),
      phone: yup.string().required('Phone number is required'), // Adjust validation if needed
      gender: yup.boolean().oneOf([true, false], 'Gender is required'),
      }),
      onSubmit: (values) => {
       // Lấy dữ liệu từ form thành công
            mutation.mutateAsync(values);
      }
    });

    // Dùng formik quản lý frmUpdatePasswordUser
    const frmUpdatePasswordUser = useFormik({
      initialValues: {
        newPassword:'',
        newPasswordConfirm:''
      },
      validationSchema: yup.object().shape({
        newPassword: yup.string().min(6, 'New password must be at least 6 characters').required('New password is required'),
        newPasswordConfirm: yup.string().min(6, 'New password confirm must be at least 6 characters').required('New password confirm is required').oneOf([yup.ref('newPassword')], 'Passwords must match'),
        }),
        onSubmit: (values) => {
          // Lấy dữ liệu từ form thành công
          mutationUpdatePassword.mutateAsync(values.newPassword);
         }
    })
    
    useEffect(()=>{
      getProfileApi();
      frmUpdateUser.setValues({
        name: userProfile.name,
        email: userProfile.email,
        phone:userProfile.phone,
        gender:userProfile.gender
      });
    }, [userProfile.name, userProfile.email, userProfile.phone, userProfile.gender]);
    
  return (
    <div className='container'>
      <h3>Profile</h3>

      <div className="row mt-2">
        <div className="col-2">
        <img src={userProfile?.avatar} className='rounded rounded-circle' width={150} height={150}  alt="avatar" />
        </div>

        {/* Form Update Info  */}
        <form className="col-5" onSubmit={frmUpdateUser.handleSubmit}>
          <h4 className='text-primary'>Info of {userProfile.name}</h4>
        <div className='form-group'>
          <label>Email:</label>
          <input className='form-control mt-2' name="email" value={frmUpdateUser.values.email} onChange={frmUpdateUser.handleChange} onBlur={frmUpdateUser.handleBlur}/>
          {frmUpdateUser.errors.email && <div className="text-danger">{frmUpdateUser.errors.email}</div>}
        </div>
        <div className='form-group'>
          <label>Name:</label>
          <input className='form-control mt-2' name="name" value={frmUpdateUser.values.name} onChange={frmUpdateUser.handleChange} onBlur={frmUpdateUser.handleBlur}/>
          {frmUpdateUser.errors.name && <div className="text-danger">{frmUpdateUser.errors.name}</div>}
        </div>
        <div className='form-group'>
          <label>Phone:</label>
          <input className='form-control mt-2' name="phone" value={frmUpdateUser.values.phone} onChange={frmUpdateUser.handleChange} onBlur={frmUpdateUser.handleBlur}/>
          {frmUpdateUser.errors.phone && <div className="text-danger">{frmUpdateUser.errors.phone}</div>}
        </div>
        <div className='form-group'>
          <label className='me-2 mt-2'>Gender:</label>
          <div>
            <label htmlFor="male">Male</label>
            <input id="male" value={true} type='radio' className='form-check-input mx-2' name="gender" checked={frmUpdateUser.values.gender === true} onChange={frmUpdateUser.handleChange} onBlur={frmUpdateUser.handleBlur}/>
          
            <label htmlFor="female">Female</label>
            <input id='female' value={false} type='radio' className='form-check-input mx-2' name="gender" checked={frmUpdateUser.values.gender === false} onChange={frmUpdateUser.handleChange} onBlur={frmUpdateUser.handleBlur}/>
            </div>
          {frmUpdateUser.errors.gender && <div className="text-danger">{frmUpdateUser.errors.gender}</div>}
          </div>
          
        <div className='form-group'>
            <button className='btn btn-primary mt-3' type="submit" disabled={!frmUpdateUser.isValid} >Update Info</button>
          </div>
        </form>

        {/* Form Update Password  */}
        <form className="col-5" onSubmit={frmUpdatePasswordUser.handleSubmit}>
        <h4 className='text-danger'>Change Password of {userProfile.name} </h4>
        <div className='form-group'>
          <label>New Password:</label>
          <input className='form-control mt-2' type='password' name="newPassword" onChange={frmUpdatePasswordUser.handleChange} onBlur={frmUpdatePasswordUser.handleBlur}/>
          {frmUpdatePasswordUser.errors.newPassword && <div className="text-danger">{frmUpdatePasswordUser.errors.newPassword}</div>}
        </div>
        <div className='form-group'>
          <label>New Password Confirm:</label>
          <input className='form-control mt-2' type='password' name="newPasswordConfirm" onChange={frmUpdatePasswordUser.handleChange} onBlur={frmUpdatePasswordUser.handleBlur}/>
          {frmUpdatePasswordUser.errors.newPasswordConfirm && <div className="text-danger">{frmUpdatePasswordUser.errors.newPasswordConfirm}</div>}
        </div>
        <div className='form-group'>
            <button className='btn btn-danger mt-3' type="submit" disabled={!frmUpdatePasswordUser.isValid} >Change Password</button>
          </div>
          
        
        </form>
      </div>
    
    <h3>Hello ! {userProfile?.name}</h3>
  </div>
  )
}

export default Profile