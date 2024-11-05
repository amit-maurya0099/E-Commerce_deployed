
import React, { useState,useEffect } from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useDispatch, useSelector } from "react-redux";
import { toggleSignUp, setIsAuthenticated, setLoading,addUser } from "../Utils/appSlices/userSlice";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const {isAuthenticated}=useSelector((store)=>store.users)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location=useLocation();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleSignInClick = () => {
    dispatch(toggleSignUp());
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
   
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();
      dispatch(setLoading(false));
      if (response.ok) {
        //  Cookies.set("userRole",)
        localStorage.setItem("user",JSON.stringify(data.user));
        dispatch(addUser(data.user));
        dispatch(setIsAuthenticated(true));
        setUser({
          email: "",
          password: ""
        });
        toast.success("Login Successful");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log("error", error);
    }
  };

  const redirect=location.search ? location.search.split("=")[1]:"/"
 

 
  useEffect(()=>{
   if(isAuthenticated){
    navigate(redirect);
   }

  },[isAuthenticated])



  return (
    <div className="flex flex-col items-center h-full bg-#B4C8F8">
     
      <h1 className="text-2xl font-bold m-2 text-blue-500">LOGIN</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-10 shadow-2xl w-[80%] m-2 py-10 px-4 bg-white rounded-xl">
        <div className="flex items-center h-[2rem] bg-white px-1 border">
          <MailOutlineIcon />
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full outline-none h-full px-1"
            value={user.email}
            name="email"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <div className="flex justify-center items-center h-[2rem] bg-white px-1 border">
            <LockOpenIcon />
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full h-full px-1 outline-none"
              value={user.password}
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <Link to="/password/forgot">
            <p className="text-right text-sky-700 cursor-pointer">Forgot Password?</p>
          </Link>
        </div>
        <div>
          <p className="text-center text-purple-500">
            By continuing you agree to <b>Terms of Use</b> and <b>Privacy Policy</b>
          </p>
        </div>
        <button type="submit" className="bg-orange-500 text-white text-lg px-4 py-1">
          Continue
        </button>
        <div className="flex justify-center">
          <p>
            Not a User?
            <span className="px-1 text-sky-700 cursor-pointer" onClick={handleSignInClick}>
              Create Account
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
