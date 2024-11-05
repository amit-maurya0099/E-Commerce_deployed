import React, { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setLoading, toggleSignUp } from "../Utils/appSlices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Utils/Loader";


const Register = () => {
 
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [avatarPreview,setAvatarPreview]=useState("https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png")
  const loading=useSelector((store)=>store.users.loading)
  

  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
    avatar:""
  })
 


  const handleSignInClick = () => {
    dispatch(toggleSignUp());
  };

  const registerDataChange=(e)=>{
    let name=e.target.name;
    let value=e.target.value;
    if(name==="avatar"){
      const reader=new FileReader();
      reader.onload=()=>{
        if(reader.readyState === 2){
          setAvatarPreview(reader.result)
         setUser({...user,avatar:reader.result})
        }
        
      }
      
      reader.readAsDataURL(e.target.files[0])
        
    }
    else{
      setUser({
        ...user,
        [name]:value

    })

    }
  }

  const {name,email,password,avatar}=user;
 const handleRegisterSubmit=async(e)=>{
  e.preventDefault();
  const myForm=new FormData();
  myForm.set('name',name);
  myForm.set('email',email);
  myForm.set('password',password)
  myForm.set('avatar',avatar);
  
try {
  dispatch(setLoading(true))
 const response=await fetch("https://e-commerce-backend-545f.onrender.com/api/user/register",{
  method:"POST",
  credentials:"include",
  body:myForm
 
 })
 console.log(response)
 const data=await response.json();
  console.log(data)
dispatch(setLoading(false))
 if(response.ok){
  
  toast.success("user registered successfully")
  setIsAuthenticated(true)
  setUser({
    name:"",
    email:"",
    password:"",
    avatar:""
  })
  dispatch(setLoading(true))
  navigate("/signUp")
  dispatch(setLoading(false))
 }else{
  toast.error(data.message)
 }
   
} catch (error) {
  dispatch(setLoading(false))
  console.log(error)
}
  

 }

  return (
    <div className=" flex flex-col items-center   ">
    {loading? <Loader/>:<>
      <h1 className="text-2xl font-bold  m-2 underline">REGISTER</h1>
      <form className="flex flex-col gap-8 shadow-2xl w-[80%] m-2 py-10 px-4 bg-white rounded-xl " onSubmit={handleRegisterSubmit}>
        <div className="flex  items-center h-[2rem] bg-white px-1 border ">
          <PersonIcon />
          <input
            type="text"
            name="name"
            value={user.name}
            placeholder="Enter your Name"
            className=" w-full outline-none h-full px-1"
            onChange={registerDataChange}
          ></input>
        </div>

        <div className="flex  items-center h-[2rem] bg-white px-1 border">
          <MailOutlineIcon />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={registerDataChange}
            placeholder="Enter your Email"
            className=" w-full outline-none h-full px-1"
          ></input>
        </div>
        <div className="flex justify-center items-center h-[2rem] bg-white px-1 border ">
          <LockOpenIcon />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={registerDataChange}
            placeholder="Enter your Password"
            className=" w-full h-full px-1 outline-none"
          ></input>
        </div>
        <div className="flex items-center">
          <img src={avatarPreview} alt="avatar" className="size-8 rounded-full "></img>
          <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={registerDataChange}
          className="w-full cursor-pointer border border-gray-300 rounded-lg px-3 py-2 ml-1 "

          >
          </input>
        </div>


       
          <button type="submit" className=" bg-orange-500 text-white text-lg px-4 py-1">
            Submit
          </button>
     
        <div className="flex justify-center">
          <p>
            Already a User?
            <span
              className="px-1 text-sky-700 cursor-pointer"
              onClick={handleSignInClick}
            >
              {" "}
              SignIn{" "}
            </span>
          </p>
        </div>
      </form>
      </>} 
</div>
);
};

export default Register;
