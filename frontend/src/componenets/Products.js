import React, { useState } from "react";
import useGetQueryProducts from "../Hooks/useGetQueryProducts";
import { useSelector } from "react-redux";
import ProductCard from "../Utils/ProductCard";
import { Pagination } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Utils/Loader";

const Products = () => {
  const location=useLocation();
  const query=new URLSearchParams(location.search);
  const keyword=query.get('keyword');
   const isLoading=useSelector((store)=>store.users.loading);

  const navigate=useNavigate();
  const [currentPage,setCurrentPage]=useState(1);
  useGetQueryProducts();
  const products = useSelector((store) => store.products.allProducts);
  const productCount=useSelector((store)=>store.products.productCount);
  const resultPerPage=useSelector((store)=>store.products.resultPerPage);

  
   const totalPage=Math.ceil((products && products.length)/resultPerPage);
  

  const handlePageNo = (event,value) => {
    setCurrentPage(value);
    navigate(`/products?keyword=${keyword}&page=${value}`)
  };
 

  return (
    
    <div className="bg-yellow-50 min-h-screen pb-4">
      {isLoading ? <Loader/>:<>
      <h1 className="font-bold  text-3xl text-center  my-8 text-gray-700 shadow-xl shadow-gray-400">
        Products{" "}
      </h1>
      <div className="flex gap-20 flex-wrap justify-center m-5">
        {products && products.length === 0 ? (
          <div className="flex text-xl font-semibold items-center">
            <p>No Product Found</p>
          </div>
        ) : (
         products && products.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center border py-2 bg-white text-blue-500]">
        <Pagination 
          count={totalPage}
          color="primary" 
          size="medium"
          showFirstButton= {true}
          showLastButton= {true}
          onChange={handlePageNo}
          page={currentPage}
          variant="outlined"
          shape="rounded"

          />
      
      </div>
      </>}
    </div>
  );
};

export default Products;
