import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileActionAsync } from "../../redux/reducers/userReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../../services/apiStore/user/userApi";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { deleteOrderActionAsync } from "../../redux/reducers/cartReducer";
import toast from "react-hot-toast";

const Profile = () => {
  const { userProfile } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const getProfileApi = () => {
    const actionAsync = getProfileActionAsync();
    dispatch(actionAsync);
  };

  // Xử lý update user
  const queryClient = useQueryClient();
  //mutation Update User
  const mutationUpdateUser = useMutation({
    mutationKey: ["updateUserApi"],
    mutationFn: userApi.updateUser,
    onSuccess: (res) => {
      {
        // Xử lý sau khi success api
        getProfileApi();
        // queryClient.invalidateQueries('storeListApi');
      }
    },
    onError: (errors) => {
      toast.error(`Đổi thông tin thất bại do ${errors.response.data.message}`);
    },
  });

  //mutation Update Password
  const mutationUpdatePassword = useMutation({
    mutationKey: ["updatePasswordUserApi"],
    mutationFn: userApi.updatePasswordUser,
    onSuccess: (res) => {
      {
        // Xử lý sau khi success api
        queryClient.invalidateQueries("updateUserApi");
      }
    },
    onError: (errors) => {
      toast.error(`Đổi mật khẩu thất bại do ${errors.response.data.message}`);
    },
  });

  // Dùng formik quản lý frmUpdateUser
  const frmUpdateUser = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      gender: true,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Tên không được để trống"),
      email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
      phone: yup.string().required("Số điện thoại không được để trống"), // Adjust validation if needed
      gender: yup.boolean().oneOf([true, false], "Giới tính không được để trống"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Lấy dữ liệu từ form thành công
      mutationUpdateUser.mutateAsync(values);
    },
  });

  // Dùng formik quản lý frmUpdatePasswordUser
  const frmUpdatePasswordUser = useFormik({
    initialValues: {
      newPassword: "",
      newPasswordConfirm: "",
    },
    validationSchema: yup.object().shape({
      newPassword: yup
        .string()
        .min(6, "Mật khẩu phải có ít nhứt 6 kí tự")
        .required("Mật khẩu không được để trống"),
      newPasswordConfirm: yup
        .string()
        .min(6, "Mật khẩu xác nhận phải có ít nhứt 6 kí tự")
        .required("Mật khẩu xác nhận không được để trống")
        .oneOf([yup.ref("newPassword")], "Mật khẩu xác nhận không giống"),
    }),
    onSubmit: (values) => {
      // Lấy dữ liệu từ form thành công
      mutationUpdatePassword.mutateAsync(values.newPassword);
    },
  });

  useEffect(() => {
    getProfileApi();
  }, [userProfile.ordersHistory]);

  return (
    <div className="container">
      <p className="p--title mt-2">Hồ sơ</p>

      <div className="row mt-2">
        <div className="col-lg-2 col-sm-12">
          <img
            src={userProfile?.avatar}
            className="rounded rounded-circle"
            width={150}
            height={150}
            alt="avatar"
          />
        </div>

        {/* Form Update Info  */}
        <form
          action=""
          className="col-lg-5 col-sm-6"
          onSubmit={frmUpdateUser.handleSubmit}
        >
          <p className="p--title fs-5 mt-2">Thông tin của {userProfile.name}</p>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              className="form-control mt-2"
              type="text"
              name="email"
              defaultValue={userProfile.email}
              onChange={frmUpdateUser.handleChange}
              onBlur={frmUpdateUser.handleBlur}
            />
            {frmUpdateUser.errors.email && (
              <div className="text-danger">{frmUpdateUser.errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label>Tên:</label>
            <input
              className="form-control mt-2"
              name="name"
              defaultValue={userProfile.name}
              onChange={frmUpdateUser.handleChange}
              onBlur={frmUpdateUser.handleBlur}
            />
            {frmUpdateUser.errors.name && (
              <div className="text-danger">{frmUpdateUser.errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <label>Số điện thoại:</label>
            <input
              className="form-control mt-2"
              type="text"
              name="phone"
              defaultValue={userProfile.phone}
              onChange={frmUpdateUser.handleChange}
              onBlur={frmUpdateUser.handleBlur}
            />
            {frmUpdateUser.errors.phone && (
              <div className="text-danger">{frmUpdateUser.errors.phone}</div>
            )}
          </div>
          <div className="form-group">
            <label className="me-2 mt-2">Giới tính:</label>
            <div>
              <label htmlFor="male">Nam</label>
              <input
                id="male"
                value={true}
                type="radio"
                className="form-check-input mx-2"
                name="gender"
                onChange={frmUpdateUser.handleChange}
                onBlur={frmUpdateUser.handleBlur}
              />

              <label htmlFor="female">Nữ</label>
              <input
                id="female"
                value={false}
                type="radio"
                className="form-check-input mx-2"
                name="gender"
                onChange={frmUpdateUser.handleChange}
                onBlur={frmUpdateUser.handleBlur}
              />
            </div>
            {frmUpdateUser.errors.gender && (
              <div className="text-danger">{frmUpdateUser.errors.gender}</div>
            )}
          </div>

          <div className="form-group">
            <button
              className="rounded-5 mt-2"
              type="submit"
              disabled={!frmUpdateUser.isValid}
            >
              Cập nhật
            </button>
          </div>
        </form>

        {/* Form Update Password  */}
        <form
          className="col-lg-5 col-sm-6 mt-2"
          onSubmit={frmUpdatePasswordUser.handleSubmit}
        >
          <p className="p--title fs-5">
            Đổi mật khẩu
          </p>
          <div className="form-group">
            <label>Mật khẩu mới:</label>
            <input
              className="form-control mt-2"
              type="password"
              name="newPassword"
              onChange={frmUpdatePasswordUser.handleChange}
              onBlur={frmUpdatePasswordUser.handleBlur}
            />
            {frmUpdatePasswordUser.errors.newPassword && (
              <div className="text-danger">
                {frmUpdatePasswordUser.errors.newPassword}
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Xác nhận mật khẩu mới:</label>
            <input
              className="form-control mt-2"
              type="password"
              name="newPasswordConfirm"
              onChange={frmUpdatePasswordUser.handleChange}
              onBlur={frmUpdatePasswordUser.handleBlur}
            />
            {frmUpdatePasswordUser.errors.newPasswordConfirm && (
              <div className="text-danger">
                {frmUpdatePasswordUser.errors.newPasswordConfirm}
              </div>
            )}
          </div>
          <div className="form-group">
            <button
              className="btn btn-danger mt-2 rounded-5"
              style={{ width: 160 }}
              type="submit"
              disabled={!frmUpdatePasswordUser.isValid}
            >
              Đổi mật khẩu
            </button>
          </div>
        </form>
      </div>
      <hr />
      <p className="p--title">Lịch sử đơn hàng</p>
      {userProfile.ordersHistory?.map((item, index) => {
        return (
          <div key={index}>
            <table className="table table-striped caption-top">
              <caption>
                <p className="fs-5 text-primary">
                  Đơn hàng id: {item.id} được đặt lúc{" "}
                  {moment(item.date).format("DD/MM/yyyy HH:mm:ss")}
                </p>
              </caption>
              <thead>
                <tr className="row table-primary">
                  <th className="col-2" scope="col">
                    Hình ảnh
                  </th>
                  <th className="col-2" scope="col">
                    Tên sản phẩm
                  </th>
                  <th className="col-2" scope="col">
                    Giá
                  </th>
                  <th className="col-2" scope="col">
                    Số lượng
                  </th>
                  <th className="col-2" scope="col">
                    Tổng
                  </th>
                  <th className="col-2" scope="col">
                    <button
                      className="btn btn-danger w-auto rounded-5"
                      
                      onClick={() => {
                        if (
                          confirm(
                            "Bạn có chắc chắn muốn xóa đơn hàng này không ?"
                          )
                        ) {
                          const actionDeleteOrder = deleteOrderActionAsync(
                            item.id
                          );
                          dispatch(actionDeleteOrder);
                        }
                      }}
                    >
                      Xóa
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {item.orderDetail?.map((prod, index) => {
                  return (
                    <tr key={index} className="row">
                      <td className="col-2">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          width={50}
                          height={50}
                        />
                      </td>
                      <td className="col-2">{prod.name}</td>
                      <td className="col-2">{prod.price} $</td>
                      <td className="col-2">{prod.quantity / 100}</td>
                      <td className="col-2">
                        {(prod.quantity / 100) * prod.price} $
                      </td>
                      <td className="col-2"></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
