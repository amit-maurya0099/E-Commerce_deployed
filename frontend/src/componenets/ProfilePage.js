import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from "js-cookie"
import { addUser, setIsAuthenticated } from '../Utils/appSlices/userSlice';
import { useNavigate } from 'react-router-dom';



const ProfilePage = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

const user=useSelector((store)=>store.users.user)
const isAuthenticated=useSelector((store)=>store.users.isAuthenticated)

const getProfileData = async () => {
   
    try {
      const response = await fetch("http://localhost:4000/api/user/profile/details", {
        method: "GET",
        credentials:"include",
      });
      
      const data = await response.json();
      dispatch(addUser(data));
      
    } catch (error) {
      
      console.log(error);
    }
  };

  const token = Cookies.get("token");
  if (token) {
    dispatch(setIsAuthenticated(true));
    
  }


  const handleEditProfile=()=>{
    navigate("update")
  }

  useEffect(()=>{
    if(isAuthenticated){
        getProfileData();
      }
  },[isAuthenticated]) 
  
  return (
    <div className='min-h-screen flex justify-center'>
        <div className='w-[80%] flex justify-center  m-4 '>
        <div className=' w-[40%] m-4 shadow-xl rounded-xl flex flex-col gap-10 items-center'>
            <h1 className='text-2xl font-bold text-center m-4'>My Profile</h1>
            <img src={user.avatar && user.avatar.url} alt="/" className='size-64 rounded-full object-cover'></img>
        <div>
           <div className='flex justify-center m-4 bg-orange-600 text-white text-lg px-10 py-1' onClick={handleEditProfile}>
            <button>Edit Profile</button>
           </div>
           <div className='flex justify-center m-4 bg-orange-600 text-white text-lg px-10 py-1' onClick={()=>navigate("/")}>
            <button>Go to Home</button>
           </div>
        </div>
        </div>
        <div className='flex flex-col gap-4 w-[40%] m-4 shadow-xl rounded-xl p-8'>
            <div >
                <h1 className='text-lg font-serif '>Full Name</h1>
                <p className='text-gray-600 font-mono italic'>{user.name}</p>
            </div>
            <div >
                <h1 className='text-lg font-serif '>Email</h1>
                <p className='text-gray-600 font-mono italic'>{user.email}</p>
            </div>
            <div >
                <h1 className='text-lg font-serif '>Phone Number</h1>
                <p className='text-gray-600 font-mono italic'>{user.phone?user.phone:"null"}</p>
            </div>
            <div >
                <h1 className='text-lg font-serif '>Address</h1>
                <p className='text-gray-600 font-mono italic'>{user.address?user.address:"null"}</p>
            </div>
            <div >
                <h1 className='text-lg font-serif '>Created At</h1>
                <p className='text-gray-600 font-mono italic'>{user.createdAt}</p>
            </div>
            <div >
                <h1 className='text-lg font-serif '>Updated At</h1>
                <p className='text-gray-600 font-mono italic'>{user.updatedAt}</p>
            </div>
            <div className='flex flex-col gap-2 items-center'>
            <div className=' flex justify-center  bg-gray-800 text-white text-lg px-10 py-1 w-[60%]'>
            <button>My Orders</button>
           </div>
           <div className='flex justify-center bg-gray-800 text-white text-lg px-10 py-1 w-[60%]'
           onClick={()=>navigate("/password/update")}
           >
            <button>Change Password</button>
           </div>
           </div>

        </div>
        </div>
      
    </div>
  )
}

export default ProfilePage
