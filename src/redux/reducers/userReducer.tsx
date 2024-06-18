import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getDataJsonStorage,
  setCookie,
  setDataJsonStorage,
  setDataTextStorage,
} from "../../util/utilMethod";
import { ACCESS_TOKEN, USER_LOGIN, httpClient } from "../../util/util";
import { routeLink } from "../../App";
import { useDispatch } from "react-redux";

const initialState = {
  userLogin: getDataJsonStorage(USER_LOGIN),
  userProfile: {},
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setLoginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    setProfileAction: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setLoginAction, setProfileAction } = userReducer.actions;

export default userReducer.reducer;

export const loginApiActionAsync = (userLogin) => {
  return async (dispatch) => {
    try {
      const res = await httpClient.post("/api/users/signin", userLogin);

      // Sau khi đăng nhập thành công thì chuyển trang qua profile đồng thời lưu thông tin vào localstorage
      setDataJsonStorage(USER_LOGIN, res.data.content);
      setDataTextStorage(ACCESS_TOKEN, res.data.content.accessToken);
      setCookie(ACCESS_TOKEN, res.data.content.accessToken, 30);
      const action = setLoginAction(res.data.content);
      dispatch(action);
      routeLink.push("/profile");
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProfileActionAsync = () => {
  return async (dispatch) => {
    const res = await httpClient.post("/api/users/getProfile");

    const action = setProfileAction(res.data.content);
    dispatch(action);
  };
};
