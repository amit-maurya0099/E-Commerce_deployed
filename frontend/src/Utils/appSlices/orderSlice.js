import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
    name:"orders",
    initialState:{
        allOrders:[],
        stripeApiKey:''

    },
    reducers:{
        addAllOrders:(state,action)=>{
            state.allOrders=action.payload
        },
        removeOrder:(state,action)=>{
            state.allOrders=state.allOrders.filter((item)=>item._id !== action.payload);
        },
        addStripeKey:(state,action)=>{
            state.stripeApiKey=action.payload;
        }

    }
})
  export const {addAllOrders,removeOrder,addStripeKey}=orderSlice.actions
export default orderSlice.reducer; 