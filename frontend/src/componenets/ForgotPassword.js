import React, { useState } from "react";

import EmailIcon from '@mui/icons-material/Email';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Utils/appSlices/userSlice";
import Loader from "../Utils/Loader";

const ForgotPassword = () => {
  const loading=useSelector((store)=>store.users.loading);
  const dispatch=useDispatch();

    const [data,setData]=useState({
        email:""
    });
  const InputDataChange = (e) => {
    let name=e.target.name
    let value=e.target.value
    
    setData({
        ...data,
      [name]:value
    } )
  };
  const {email}=data;
  const handleFormSubmit = async(e) => {
    const myForm=new FormData();
    myForm.set("email",email)
    e.preventDefault();
    try {
       dispatch(setLoading(true))
        const response=await fetch("http://localhost:4000/api/user/password/forgot",{
            method:"POST",
            body:myForm,
            credentials:"include"
        })
        console.log(response)
        const data=await response.json();
        console.log(data)
        dispatch(setLoading(false))
        if(response.ok){
            toast.success("email sent Successfully")
        }else{
            toast.error("Can't send email")
        }
        
    } catch (error) {
        toast.error("Something went wrong")
        console.log(error)
        
    }

  };

  return (
  <>
  
      {loading? <Loader/>:
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-[25%] h-[40vh] shadow-xl  ">
        <div className="flex justify-center ">
          <div className="text-xl font-semibold text-gray-600 border-b-2 border-gray-400 w-[65%] py-2   ">
            <h1 className="text-center ">Forgot Password </h1>
          </div>
        </div>
        <form
          className="  align-middle font-mono py-8"
          onSubmit={handleFormSubmit}
        >
          <div className="flex  items-center h-[3rem]  px-2  border mx-4 ">
            <EmailIcon />
            <input
              type="email"
              name="email"
              value={data.email}
              placeholder="Email"
              className=" w-full outline-none h-full px-4"
              onChange={InputDataChange}
            ></input>
          </div>
          <div className="text-white bg-orange-600 text-xl text-center font-semibold my-16  mx-8 py-2 cursor-pointer "
           
          >
          <button type="submit" >Send</button>
          </div>
        </form>
      </div>
 
    </div>
}
    </>
  );
};

export default ForgotPassword;
