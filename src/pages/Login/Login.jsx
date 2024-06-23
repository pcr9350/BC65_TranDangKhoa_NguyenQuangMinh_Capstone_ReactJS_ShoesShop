import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginApiActionAsync } from "../../redux/reducers/userReducer";

const Login = () => {
  const dispatch = useDispatch();

  const frmLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email không được để trống")
        .email("Email không hợp lệ"),
      password: yup.string().required("Mật khẩu không được để trống"),
    }),
    onSubmit: async (userLogin) => {
      dispatch(loginApiActionAsync(userLogin));
    },
  });

  return (
    <div className="container">
      <form onSubmit={frmLogin.handleSubmit} className="w-50 mx-auto">
        <p className="p--title text-center mt-2">Đăng nhập</p>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            className="form-control mt-2"
            name="email"
            id="email"
            onChange={frmLogin.handleChange}
            onBlur={frmLogin.handleBlur}
            value={frmLogin.values.email}
          />
          {frmLogin.touched.email && frmLogin.errors.email && (
            <p className="text text-danger">{frmLogin.errors.email}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            className="form-control mt-2"
            type="password"
            name="password"
            id="password"
            onChange={frmLogin.handleChange}
            onBlur={frmLogin.handleBlur}
            value={frmLogin.values.password}
          />
          {frmLogin.touched.password && frmLogin.errors.password && (
            <p className="text text-danger">{frmLogin.errors.password}</p>
          )}
        </div>
        <div className="form-group">
          <button
            className="btn btn-primary mt-2 rounded-5"
            style={{ width: 120 }}
            type="submit"
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
