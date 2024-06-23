import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storageData } from "../../util/storageData";
import { httpClient } from "../../util/util";
import toast from "react-hot-toast";

const initialState = {
  products: JSON.parse(localStorage.getItem("userCart")) || [],

};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const currentCart = [...state.products];

      const existingProductIndex = currentCart.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        currentCart[existingProductIndex].count += action.payload.count;
      } else {
        currentCart.push(action.payload);
      }

      state.products = currentCart;
      storageData.setData("userCart", currentCart);
    },

    removeProductToCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product?.id !== action.payload
      );
    },
    cartUp: (state, action) => {
      const dataUpdated = state.products.map((product) => {
        if (product.id === action.payload) {
          product.count += 1;
        }
        return product;
      });
      storageData.setData("userCart", dataUpdated);
      state.products = dataUpdated;
    },
    cartDown: (state, action) => {
      const dataUpdated = state.products.map((product) => {
        if (product.id === action.payload) {
          product.count -= 1;
        }
        return product;
      });
      storageData.setData("userCart", dataUpdated);
      state.products = dataUpdated;
    },
    removeProductToCard: (state, action) => {
      state.products = state.products.filter(
        (product) => product?.id !== action.payload
      );
    },
    setCartAfterBuy: (state, action) => {
      state.products = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addOrderActionAsync.fulfilled, (state, action) => {
      // console.log("success", state, action);
      toast.success("Đặt hàng thành công")
    });
    builder.addCase(addOrderActionAsync.pending, (state, action) => {
      // console.log("pending");
    });
    builder.addCase(addOrderActionAsync.rejected, (state, action) => {
      // console.log("error", state, action);
      toast.error("Đặt hàng thất bại")
    });

    builder.addCase(deleteOrderActionAsync.fulfilled, (state, action) => {
      // console.log("success", state, action);
      toast.success("Xóa đơn hàng thành công")
    });
    builder.addCase(deleteOrderActionAsync.pending, (state, action) => {
      // console.log("pending");
    });
    builder.addCase(deleteOrderActionAsync.rejected, (state, action) => {
      // console.log("error", state, action);
      toast.error('Xóa đơn hàng thất bại')
    });
  }
});

export const {
  addProductToCart,
  removeProductToCart,
  cartDown,
  cartUp,
  removeProductToCard,
  setCartAfterBuy,
} = cartSlice.actions;
export default cartSlice.reducer;

// Dùng thư viện từ redux toolkit để tạo ra action async
// Thêm đơn hàng 
export const addOrderActionAsync = createAsyncThunk(
  "cartReducer/addOrderActionAsync",
  async (orderSubmit, { dispatch }) => {
    try {
      const res = await httpClient.post("/api/Users/order", orderSubmit);
      return res.data.content; //return về giá trị nào thì ta sẽ nhận được giá trị đó tại fullfill của extrareducer
    } catch (err) {
      return Promise.reject(err);
    } finally {

      return "finally"; //return về giá trị nào thì ta sẽ nhận được giá trị đó tại fullfill của extraReducer
    }
  }
);

//Xóa đơn hàng
export const deleteOrderActionAsync = createAsyncThunk(
  "cartReducer/deleteOrderActionAsync",
  async (idOrder, { dispatch }) => {
    try {
      const res = await httpClient.post("/api/Users/deleteOrder", { 'orderID': idOrder });
      return res.data.content; //return về giá trị nào thì ta sẽ nhận được giá trị đó tại fullfill của extrareducer
    } catch (err) {
      return Promise.reject(err);
    } finally {

      return "finally"; //return về giá trị nào thì ta sẽ nhận được giá trị đó tại fullfill của extraReducer
    }
  }
);