import { createSlice } from "@reduxjs/toolkit";
import { storageData } from "../../util/storageData";

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
  },
});

export const {
  addProductToCart,
  removeProductToCart,
  cartDown,
  cartUp,
  removeProductToCard,
} = cartSlice.actions;
export default cartSlice.reducer;
