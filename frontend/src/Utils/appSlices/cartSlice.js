import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem('cartItems')):[],
        shippingInfo:localStorage.getItem("shippingInfo")? JSON.parse(localStorage.getItem("shippingInfo")):{}
    },
    reducers:{
        addToCart:(state,action)=>{
            state.cartItems=action.payload;
        },  
        saveShippingInfo:(state,action)=>{
            state.shippingInfo=action.payload
            localStorage.setItem("shippingInfo",JSON.stringify(action.payload));
        } ,
        removeCartItems:(state,action)=>{
             state.cartItems=[]
        }

    }
})

export const  {addToCart,saveShippingInfo,removeCartItems}=cartSlice.actions
export default cartSlice.reducer;