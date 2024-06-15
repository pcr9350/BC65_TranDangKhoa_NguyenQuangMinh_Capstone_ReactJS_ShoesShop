import axios from "axios";
import { routeLink } from "../App";

export const ACCESS_TOKEN = 'access_token';
export const USER_LOGIN = 'userLogin'
// lấy token học viên từ khóa học dán dô 
export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2NSIsIkhldEhhblN0cmluZyI6IjIwLzExLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTczMjA2MDgwMDAwMCIsIm5iZiI6MTcwMjMxNDAwMCwiZXhwIjoxNzMyMjA4NDAwfQ.8jL30xUvuN74PYnFHxIjmfu65QEtLdvz_dWZnK6QxGk'

export const DOMAIN = 'https://apistore.cybersoft.edu.vn';

export const httpClient = axios.create({
    baseURL:DOMAIN,
    timeout:30000
});

httpClient.interceptors.request.use((req) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (req.headers) {
        req.headers.set('Authorization', accessToken ? `${accessToken}` : '');
        req.headers.set('tokenCybesoft', TOKEN_CYBERSOFT);
    }
    return req;
}, (err) => {
    return Promise.reject(err);
});

httpClient.interceptors.response.use(
    (response) => {
        // Xử lý response thành công
        return response;
    },
    (error) => {
        // Xử lý lỗi response
        if (error.response) {
            // Server đã trả về một response nhưng với mã trạng thái lỗi
            switch (error.response.status) {
                case 401:
                    // Xử lý lỗi 401 Unauthorized, ví dụ: chuyển hướng đến trang đăng nhập
                    console.error("Unauthorized access - perhaps the user is not logged in or token expired.");
                    routeLink.push('/login')
                    break;
                case 403:
                    // Xử lý lỗi 403 Forbidden
                    console.error("Forbidden - you don't have permission to access this resource.");
                    routeLink.push('/login')
                    break;
                case 404:
                    // Xử lý lỗi 404 Not Found
                    console.error("Resource not found.");
                    break;
                case 500:
                    // Xử lý lỗi 500 Internal Server Error
                    console.error("Internal server error.");
                    break;
                default:
                    // Xử lý các mã lỗi khác
                    console.error(`Error ${error.response.status}: ${error.response.statusText}`);
            }
        } else if (error.request) {
            // Request đã được gửi nhưng không nhận được phản hồi từ server
            console.error("No response received from server.");
        } else {
            // Một số lỗi khác xảy ra trong quá trình thiết lập request
            console.error("Error setting up request: ", error.message);
        }

        return Promise.reject(error);
    }
);