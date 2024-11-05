import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:"products",
    initialState:{
        allProducts:[],
        product:{},
        resultPerPage:null,
        productCount:null,
        filterProductsCount:null,
        adminProducts:[],
        allReviews:[]
    },
    reducers:{
       addAllProducts:(state,action)=>{
        
        state.allProducts=action.payload
       } ,
       addProductDetails:(state,action)=>{
          state.product=action.payload
       },
       addResultPerPage:(state,action)=>{
           state.resultPerPage=action.payload
       },
       addProductCount:(state,action)=>{
        state.productCount=action.payload
    },
      addFilterProductsCount:(state,action)=>{
        state.filterProductsCount=action.payload
      },
      addAdminProducts:(state,action)=>{
        state.adminProducts=action.payload
      },
      removeProduct: (state, action) => {
        state.adminProducts = state.adminProducts.filter(product => product._id !== action.payload);
    },
    setAllReviews:(state,action)=>{
      state.allReviews=action.payload;
    },
    deleteReview:(state,action)=>{
      state.allReviews=state.allReviews.filter((rev)=>rev._id !==action.payload)
    }
    }
})

export const {addAllProducts,addProductDetails,addResultPerPage,addProductCount,addFilterProductsCount,addAdminProducts,removeProduct,setAllReviews,deleteReview}=productSlice.actions;
export default productSlice.reducer