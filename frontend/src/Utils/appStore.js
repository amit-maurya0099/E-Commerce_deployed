import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./appSlices/productSlice"
import userReducer from "./appSlices/userSlice"
import cartReducer from "./appSlices/cartSlice"
import orderReducer from "./appSlices/orderSlice"
const appStore=configureStore({
    reducer:{
     products:productReducer,
     users:userReducer,
     cart:cartReducer,
     orders:orderReducer
     
    }
});

export default appStore;