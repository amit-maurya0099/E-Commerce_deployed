import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../Utils/ProductCard';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAllProducts from '../Hooks/useAllProducts';
import {Slider} from '@mui/material';
import {Typography} from '@mui/material';
import MetaData from '../Utils/MetaData';
import { addUser, setIsAuthenticated } from '../Utils/appSlices/userSlice';
import Cookies from "js-cookie"
import Loader from '../Utils/Loader';


const categories=["Footwear","Electronics","Home Appliances", "Toys" , "Books", "Furniture", "Travel"]

const AllProducts = () => {
  const dispatch=useDispatch()
  const {loading}=useSelector((store)=>store.users)
  const [price,setPrice]=useState([0,25000]);
  const [currentPage,setCurrentPage]=useState(1);
  const [category,setCategory]=useState();
  const [rating,setRating]=useState(0);
const isAuthenticated=useSelector((store)=>store.users.isAuthenticated)
  const navigate=useNavigate();

  const token = Cookies.get("token");
  if (token) {
    dispatch(setIsAuthenticated(true));
    
  }
  
    useAllProducts(currentPage,price,rating,category);
  const products=useSelector((store)=>store.products.allProducts)
  
  const resultPerPage=useSelector((store)=>store.products.resultPerPage)
  const filterProductsCount=useSelector((store)=>store.products.filterProductsCount)
  
  const totalPage=Math.ceil(filterProductsCount/resultPerPage)
  const handlePageNo=(event,value)=>{
    setCurrentPage(value);
    navigate(`/products/all?page=${value}`)
  }
  const priceHandler=(event,newPrice)=>{
    setPrice(newPrice);
  }
  const ratingHandler=(event,newRating)=>{
    setRating(newRating);

  }
  // const getProfileData = async () => {
   
  //   try {
  //       // dispatch(setLoading(true));
  //     const response = await fetch("https://e-commerce-backend-545f.onrender.com/api/user/profile/details", {
  //       method: "GET",
  //       credentials:"include"
  //     });
      
  //     const data = await response.json();
  //     dispatch(addUser(data));
      
  //   } catch (error) {
      
  //     console.log(error);
  //   }
  // };

  // if(isAuthenticated){
  //   getProfileData();
  // }
  
  return (
    < >
      { loading? <Loader/>:<>
      <MetaData title="Products--Ecommerce"/>
      <div className=' flex min-h-screen '>
      <div className='p-8 w-[15%]  sticky top-0 left-0  border-r shadow-xl '>
        <Typography>Price</Typography>
        <Slider
           value={price}
           onChange={priceHandler}
           valueLabelDisplay='auto'
           aria-labelledby='continuous-slider'
           min={0}
           max={25000}
        />
    <Typography ><span className='font-semibold text-xl'>Categories </span></Typography>
        <ul>
          {
            categories.map((category,index)=>(
              <li key={index} className='text-md text-black transition-all hover:text-purple-700 cursor-pointer' onClick={()=>
                {
                  setCategory(category); 
                  
                  navigate(`/products/all?category=${category}`)}} >{category}</li>
            ))
          }
        </ul>
        <fieldset>
          <legend>Rating Above</legend>
          <Slider
          value={rating}
          onChange={ratingHandler}
          aria-labelledby='continuous-slider'
          valueLabelDisplay='auto'
          min={0}
          max={5}
          />
        </fieldset>
       <div className='flex justify-center'>
        <button className=' text-white bg-orange-400 px-2 py-1' onClick={()=>navigate("/")}>Go Back</button>
        </div>

 
        

      </div>
       <div className="flex items-center  w-[85%] gap-14 flex-wrap justify-center m-5 ">
        
        
          {products.length===0 ? <p className='font-bold text-xl'>No product found  </p>:
         ( products &&
            products.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            )))}
        </div>
        </div>
{(filterProductsCount > resultPerPage ) &&
        <div className="flex justify-center border py-2 bg-gray-200 text-blue-500] sticky bottom-0 ">
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
      </div>}
      </>}
    </>
  )
}

export default AllProducts;

