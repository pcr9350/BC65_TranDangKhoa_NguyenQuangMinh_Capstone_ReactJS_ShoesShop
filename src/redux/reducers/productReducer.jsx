import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { httpClient } from '../../util/util';

const initialState = {
    arrProduct: [],
    productDetail: null,
}
const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    setArrProductAction: (state, action) => {
        state.arrProduct = action.payload;
    },
    setProductDetailAction: (state, action) => {
        state.productDetail = action.payload;
    },
  }
});

export const {setArrProductAction, setProductDetailAction} = productReducer.actions

export default productReducer.reducer

// action async call api get all product
export const getAllProductActionApi = () => {

    return async (dispatch, getState) => {
        // Call api
        const res = await httpClient.get('/api/Product');

        // Sau khi lấy dữ liệu từ api về thì dispatch action payload
        const action = setArrProductAction(res.data.content);
        dispatch(action);
    }
}

// action async call api get detail product
export const getDetailProductActionApi = (id) => {

    return async (dispatch) => {
        // Call api
        const res = await httpClient.get(`/api/Product/getbyid?id=${id}`);

        // Sau khi lấy dữ liệu từ api về thì dispatch action payload
        const action = setProductDetailAction(res.data.content);
        dispatch(action);
    }
}

