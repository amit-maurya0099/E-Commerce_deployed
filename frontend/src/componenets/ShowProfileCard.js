import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { MdDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser, setIsAuthenticated, setShowProfileCard } from "../Utils/appSlices/userSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie"


const ShowProfileCard = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.users.user);

  const handleLogout = async () => {
    const response = await fetch("https://e-commerce-backend-545f.onrender.com/api/user/logout", {
      method: "GET",
      credentials:"include",
    });
   
    const data = await response.json();
    toast.success(data.message);
    Cookies.remove("token")
    localStorage.removeItem("user")
    
    dispatch(setIsAuthenticated(false));
    dispatch(setShowProfileCard(false));
    dispatch(logoutUser());
    navigate("/")
  };

  return (
    <div className=" flex flex-col gap-2 w-[200px]  bg-white shadow-2xl rounded-md absolute top-16 right-5 py-1 mt-1">
    
      <div className="flex px-1 cursor-pointer ">
        <AccountCircleIcon />
        <button className="mx-1 transition-all hover:text-purple-600"
        onClick={()=>{navigate("/account"); dispatch(setShowProfileCard(false))}}>
          My Profile
        </button>
      </div> {
     (user.role ==="admin")? <div className="flex items-center pl-1 cursor-pointer">
        <MdDashboard className="size-5 mx-1" />
        <button className="transition-all hover:text-purple-600" onClick={()=>{navigate("/admin/dashboard");dispatch(setShowProfileCard(false))}}>
          DashBoard
        </button>
      </div> :<></>
      }


     {(user.role !== "admin") && <div className="flex items-center pl-1 cursor-pointer ">
        <FavoriteBorderIcon />
        <button className="mx-1 transition-all hover:text-purple-600">
          Wishlist
        </button>
      </div>}
      <div className="flex items-center pl-1 cursor-pointer">
        <FaBoxOpen className="size-5 mx-1" />
        <button className="transition-all hover:text-purple-600" onClick={()=>navigate("/orders")}>Orders</button>
      </div>
     {(user.role !== "admin") && <div className="flex items-center pl-1 cursor-pointer">
        <RiCoupon2Line className="size-5 mx-1" />
        <button className="transition-all hover:text-purple-600" >
          Rewards
        </button>
      </div>}
      <div className="flex items-center pl-1 cursor-pointer" onClick={handleLogout}>
        <LogoutIcon className="size-5 mx-1" />
        <button className="transition-all hover:text-purple-600">Logout</button>
      </div>

    
    </div>
  );
};

export default ShowProfileCard;
