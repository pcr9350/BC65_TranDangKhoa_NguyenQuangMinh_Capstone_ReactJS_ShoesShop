import { httpClient } from "../../../util/util";

export class ProductApi {
    // async getAll(): Promise<Store[]> {
    //   const res = await httpClient.get('/api/Store/getAll');
    //   return res.data.content; // Assuming response data has a 'content' property with Store[]
    // }

  
    // async getById(id: number): Promise<Store> {
    //   const res = await httpClient.get(`/api/Store/getbyid?id=${id}`);
    //   return res.data.content; // Assuming response data has a 'content' property with Store
    // }
  
    // async addUser(userRegisterForm) { // Type could be more specific based on API response
    //   const res = await httpClient.post('/api/Users/signup', userRegisterForm);
    //   alert('Thêm User thành công'); // Consider removing alerts in favor of proper UI updates
    //   return res.data.content; // Assuming response data has a 'content' property
    // }
  
    // async updateUser(userUpdateForm) { // Consistent return type for clarity
    //   const res = await httpClient.post('/api/Users/updateProfile', userUpdateForm);
    //   alert('Sửa User thành công'); // Consider removing alerts in favor of proper UI updates
    //   return res.data.content; // Assuming response data has a 'content' property with Store
    // }

    // async updatePasswordUser(password) { // Consistent return type for clarity
      
    //   const res = await httpClient.post('/api/Users/changePassword', {newPassword: password});
    //   alert('Đổi password thành công'); // Consider removing alerts in favor of proper UI updates
    //   return res.data.content; // Assuming response data has a 'content' property with Store
    // }
  
    // async deleteStore(id: number): Promise<any> { // Type could be more specific based on API response
    //   const res = await httpClient.delete('/api/Store', { data: id });
    //   alert('Xóa Store thành công'); // Consider removing alerts in favor of proper UI updates
    //   return res.data.content; // Assuming response data has a 'content' property
    // }
  }
  
  export const productApi = new ProductApi();