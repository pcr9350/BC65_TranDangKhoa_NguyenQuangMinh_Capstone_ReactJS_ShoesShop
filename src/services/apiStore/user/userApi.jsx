import toast from "react-hot-toast";
import { httpClient } from "../../../util/util";

export class UserApi {
  async addUser(userRegisterForm) {
    // Type could be more specific based on API response
    const res = await httpClient.post("/api/Users/signup", userRegisterForm);
    toast.success("Đăng kí thành công"); // Consider removing alerts in favor of proper UI updates
    return res.data.content; // Assuming response data has a 'content' property
  }

  async updateUser(userUpdateForm) {
    // Consistent return type for clarity
    console.log(userUpdateForm);
    const res = await httpClient.post(
      "/api/Users/updateProfile",
      userUpdateForm
    );
    toast.success("Thay đổi thông tin thành công"); // Consider removing alerts in favor of proper UI updates
    return res.data.content; // Assuming response data has a 'content' property with Store
  }

  async updatePasswordUser(password) {
    // Consistent return type for clarity

    const res = await httpClient.post("/api/Users/changePassword", {
      newPassword: password,
    });
    toast.success("Đổi password thành công"); // Consider removing alerts in favor of proper UI updates
    return res.data.content; // Assuming response data has a 'content' property with Store
  }

}

export const userApi = new UserApi();
