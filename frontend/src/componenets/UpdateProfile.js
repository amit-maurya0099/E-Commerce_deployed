import React, { useEffect, useState } from 'react'
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setIsAuthenticated, setLoading} from "../Utils/appSlices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie"
import CallIcon from '@mui/icons-material/Call';

import HomeIcon from '@mui/icons-material/Home';
import Loader from '../Utils/Loader';


const UpdateProfile = () => {

  const loading=useSelector((store)=>store.users.loading)
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const user=useSelector((store)=>store.users.user);
  const [data,setData]=useState({
    name:"",
    email:"",
    phone:"",
    address:"",
    avatar:""
  });
   
 const [avatarPreview,setAvatarPreview]=useState();
  

  const getProfileData = async () => {
      
    try {
      const response = await fetch("https://e-commerce-backend-545f.onrender.com/api/user/profile/details", {
        method: "GET",
        credentials:"include",
      });
      
      const data = await response.json();
      dispatch(addUser(data));
      setData(data);
    
      
    } catch (error) {
      
      console.log(error);
    }
  };

  const token = Cookies.get("token");
  if (token) {
    dispatch(setIsAuthenticated(true));
    
  }
  useEffect(()=>{
      getProfileData();
    },[])
  

    const InputDataChange=(e)=>{
       
        let name=e.target.name;
        let value=e.target.value;
        if(name==="avatar"){

          const reader=new FileReader();
          reader.onload=()=>{
            if(reader.readyState === 2){
              setAvatarPreview(reader.result)
             setData({...data,avatar:reader.result})
            }
            
          }
          
          reader.readAsDataURL(e.target.files[0])
            
        }
        else{
          setData({
            ...data,
            [name]:value
    
        })
    
        }
      }

     const {name,email,phone,address,avatar}=data;
     const handleUpdate=async(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set("name",name)
        myForm.set("email",email)
        myForm.set("phone",phone)
        myForm.set("address",address)
        myForm.set("avatar",avatar)
       
        try {
            dispatch(setLoading(true))
            const response=await fetch("https://e-commerce-backend-545f.onrender.com/api/user/profile/update",{
                method:"PUT",
                credentials:"include",
                body:myForm
            })
            console.log(response)
            const data=await response.json();
            console.log(data);
            dispatch(setLoading(false));
            if(response.ok){
                dispatch(setLoading(true))
                navigate("/account")
                dispatch(setLoading(false))
                toast.success("Profile Updated Successfully")
            }
            else{
                toast.error("Can't update Profile")
            }

            
        } catch (error) {
            dispatch(setLoading(false));
            toast.error("Something Went Wrong")
            console.log(error)         
        }
     
    
     }
  return (
      <div className=" flex flex-col items-center min-h-screen bg-gray-100 ">
      {loading? <Loader/>:<>
    <h1 className="text-2xl font-bold  m-2 underline">Update Profile</h1>
    <form className="flex flex-col gap-8 shadow-2xl w-[25%] m-2 py-10 px-4 bg-white rounded-xl " onSubmit={handleUpdate}>
      <div className="flex  items-center h-[2rem] bg-white px-1 border ">
        <PersonIcon />
        <input
          type="text"
          name="name"
          value={data.name}
          placeholder="Enter your Name"
          className=" w-full outline-none h-full px-1"
          onChange={InputDataChange}
        ></input>
      </div>

      <div className="flex  items-center h-[2rem] bg-white px-1 border">
        <MailOutlineIcon />
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={InputDataChange}
          placeholder="Enter your Email"
          className=" w-full outline-none h-full px-1"
        ></input>
      </div>
      <div className="flex  items-center h-[2rem] bg-white px-1 border">
        <CallIcon />
        <input
          type="phone"
          name="phone"
          value={data.phone}
          onChange={InputDataChange}
          placeholder="Enter your Phone number"
          className=" w-full outline-none h-full px-1"
        ></input>
      </div>
      <div className="flex  items-center h-[2rem] bg-white px-1 border">
        <HomeIcon />
        <input
          type="address"
          name="address"
          value={data.address ?data.address :""}
          onChange={InputDataChange}
          placeholder="Enter your address"
          className=" w-full outline-none h-full px-1"
        ></input>
      </div>
     
      <div className="flex items-center">
        <img src={avatarPreview? avatarPreview :(user.avatar && user.avatar.url)} alt="avatar" className="size-8 rounded-full "></img>
        <input
        type="file"
        name="avatar"
        accept="image/*"
        onChange={InputDataChange}
        className="w-full cursor-pointer border border-gray-300 rounded-lg px-3 py-2 ml-1 "
        >
        </input>
        
      </div>


     
        <button type="submit" className=" bg-orange-500 text-white text-lg px-4 py-1">
          Update
        </button>
   
      
    </form>
    </>}
    </div>
)
}

export default UpdateProfile
