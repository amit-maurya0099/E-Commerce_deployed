import React, {  useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  addUser, setIsAuthenticated, setLoading, setShowProfileCard } from "../Utils/appSlices/userSlice";
import ShowProfileCard from "./ShowProfileCard";
import Cookies from "js-cookie"
import { toast } from "react-toastify";

const Header = () => {
  const user=useSelector((store)=>store.users.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  
   const page=1;
  const isAuthenticated = useSelector((store) => store.users.isAuthenticated);
  const showProfileCard = useSelector((store) => store.users.showProfileCard);
  const handleSearchProduct = (e) => {
    e.preventDefault();
    if (keyword.trim() === "") {
      navigate("/");
    } else {
      navigate(`/products/query?keyword=${keyword}&page=${page}`);
    }
  };

  const handleClickAll = () => {
    dispatch(setLoading(true))
    navigate("/products/all");
    dispatch(setLoading(false))
  };

  
  const handleProfileClick=()=>{
    dispatch(setShowProfileCard(true))
  }
  const getProfileData = async () => {
   
    try {
      const response = await fetch("https://e-commerce-backend-545f.onrender.com/api/user/profile/details", {
        method: "GET",
         credentials:"include"
      });
      
      const data = await response.json();
      dispatch(addUser(data));
      
      
    } catch (error) {
      
      console.log(error);
    }
  };
  useEffect(()=>{
    const token = Cookies.get("token");
    if (token) {
      dispatch(setIsAuthenticated(true));
      getProfileData();
    }
  

  },[])

 
  

  return (
    <div className="sticky top-0 z-20">
      {showProfileCard? <ShowProfileCard/>: <></>}
      <header className="  flex justify-between shadow-lg py-2 text-black bg-[#B4C8F8] bg-gradient-to-r from-white ">
        <div className=" flex items-center w-[60%] ">
          <div className="px-10 w-[30%]">
            <img
              src="https://bizwiziq.com/wp-content/uploads/2019/02/shopkart-orange-1.png"
              alt="/"
              className="h-12 "
            ></img>
          </div>
          <form
            onSubmit={handleSearchProduct}
            className="flex items-center w-[70%]"
          >
            <button type="submit" className="h-full">
              <CiSearch className="size-8 bg-slate-100 text-black border-gray-300 rounded-l-2xl border-r-[1px] px-1" />
            </button>
            <input
              type="text"
              placeholder="search for product"
              className="w-[90%] h-8 px-2 focus:outline-none bg-slate-100 text-black"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
        </div>
        <div className="flex items-center justify-end gap-12  w-[40%] px-4">
          <div>
            <button
              className="flex items-center  text-lg transition-all hover:text-white"
              onClick={handleClickAll}
            >
              Explore
            </button>
          </div>

          <div>
            <button className="flex items-center  text-lg transition-all hover:text-white" onClick={()=>navigate("/orders")}>
              Orders
            </button>
          </div>
          <div>
            <button className="h-full flex items-center text-lg transition-all hover:text-white" onClick={()=>navigate("/cart")}>
              <BsCart4 />
              Cart
            </button>
          </div>
        {!isAuthenticated &&        
          <div className="flex h-full ">
              <button
                className="flex items-center  text-lg hover:bg-blue-600 hover:text-white rounded-lg px-1"
                onClick={() => navigate("/signUp")}
              >
                SignIn
              </button>
          </div>
            }
          {isAuthenticated && (user && user.avatar) ?( <div onClick={handleProfileClick} className="cursor-pointer">
            <img src={user.avatar.url} alt="/" className="size-8 rounded-full "></img>
            </div>): <></>}
        
        </div>
      </header>
    </div>
  );
};

export default Header;
