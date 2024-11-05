import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setShowMenuCard } from './appSlices/userSlice';
import { IoMdList } from "react-icons/io";

const MenuCard = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
  return (
    <div className='flex flex-col gap-1 w-[10%] bg-white text-lg shadow-xl  fixed top-16 z-20 px-2 rounded-xl  '>
       <div className='flex gap-2 cursor-pointer' onClick={()=>{navigate("/") ;dispatch(setShowMenuCard(false)) }}><HomeIcon/><p>Home</p></div> 
      <div  className='flex gap-2 cursor-pointer'onClick={()=>{navigate("/products/all");dispatch(setShowMenuCard(false)) }}><ExploreIcon/><p>Explore</p></div> 
       <div className='flex gap-2 cursor-pointer' onClick={()=>{navigate("/cart");dispatch(setShowMenuCard(false)) }}><ShoppingBagIcon/><p>Cart</p></div> 
       <div className='flex gap-2 cursor-pointer' onClick={()=>{navigate("/orders");dispatch(setShowMenuCard(false)) }}><IoMdList/><p>Orders</p></div> 
    </div>
  )
}

export default MenuCard
