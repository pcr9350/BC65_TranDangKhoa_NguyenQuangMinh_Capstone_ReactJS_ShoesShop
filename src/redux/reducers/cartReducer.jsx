// import { createSlice } from '@reduxjs/toolkit'
// import { httpClient } from '../../util/util';
// import _ from 'lodash'
// const initialState = {
//     ProductCart: []
// }

// const cartReducer = createSlice({
//   name: 'cartReducer',
//   initialState,
//   reducers: {
//     addItemCartAction: (state, action) => {
//         const newItem = {...action.payload, quantity:1};
        
//         const itemCart = state.ProductCart.find(item => item.id === newItem.id);
//         if (itemCart) {
//             itemCart.quantity += 1;
//         } else {
//             state.ProductCart.push(newItem)
//         }
//     },
//     deleteItemCartAction: (state, action) => {
//         const id = action.payload;
//         let index = state.ProductCart.findIndex(item=>item.id === id);
//         if (index != -1) {
//             state.ProductCart.splice(index,1);
//         }
//     },
//     changeQuantityItemCartAction: (state, action) => {
//         const {id, quantity} = action.payload;
        
//         const itemCart = state.ProductCart.find(item => item.id === id);
//         if(itemCart) {
//             itemCart.quantity += quantity;
//         }
//     },
//     changeInputQuantityItemCartAction: (state, action) => {
//         const {id, quantity} = action.payload;
//         const itemCart = state.ProductCart.find(item => item.id === id);
//         if(itemCart) {
//             itemCart.quantity = quantity;
//         }
//     }
//   }
// });

// export const {addItemCartAction, deleteItemCartAction, changeQuantityItemCartAction, changeInputQuantityItemCartAction} = cartReducer.actions

// export default cartReducer.reducer

// // action async add Item Cart
// export const addItemCartActionAsync = (item) => {
//     return async (dispatch) => {
//         const action = addItemCartAction(item);
//         dispatch(action);
//     }
// };

// // action async delete Item Cart
// export const deleteItemCartActionAsync = (id) => {
//     return async (dispatch) => {
//         const action = deleteItemCartAction(id);
//         dispatch(action);
//     }
// }

// // action async Change quantity Item Cart
// export const changeQuantityItemCartActionAsync = (id, quantity) => {
//     return async (dispatch) => {
//         const payload = {id, quantity}
//         const action = changeQuantityItemCartAction(payload);
//         dispatch(action);
//     }
// }


// // action async Change Input quantity Item Cart
// export const changeInputQuantityItemCartActionAsync = (id, quantity) => {
//     return async (dispatch) => {
//         const payload = {id, quantity}
//         const action = changeInputQuantityItemCartAction(payload);
//         dispatch(action);
//     }
// }
// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {

// }

// const cartReducer = createSlice({
//   name: 'cartReducer',
//   initialState,
//   reducers: {}
// });

// export const {} = cartReducer.actions

// export default cartReducer.reducer