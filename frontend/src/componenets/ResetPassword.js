import React, { useState } from "react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const params=useParams();
    const token=params.token;
    
    const navigate=useNavigate();
    const [data,setData]=useState({
        
        password:"",
        confirmPassword:""
    })

    const InputDataChange=(e)=>{
        let name=e.target.name;
        let value=e.target.value
        setData({
            ...data,
            [name]:value
        })


    }
    const {password,confirmPassword}=data;
    
    
    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        
        myForm.set("password",password);
        myForm.set("confirmPassword",confirmPassword);
      
        try {

            const response=await fetch(`https://e-commerce-backend-545f.onrender.com/api/user/password/reset/${token}`,{
                method:"PUT",
                credentials:"include",
                body:myForm
            })
            console.log(response);
            const data=await response.json();
            console.log(data)
            if(response.ok){
                navigate("/signUp")
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }

            
        } catch (error) {
            toast.error("Something Went Wrong")
            console.log(error)
            
        }
    }
  return (
    <div className="min-h-screen flex justify-center mt-10">
      <div className="w-[25%] h-[70vh] shadow-xl ">
        <div className="flex justify-center ">
        <div className="text-xl font-semibold text-gray-600 border-b-2 border-gray-400 w-[65%] py-2   ">
          <h1 className="text-center ">Reset Password</h1>
        </div>
        </div>
        <form className="flex flex-col gap-10 mt-[20%] mx-4 font-mono" onSubmit={handleFormSubmit}>
         
          <div className="flex  items-center h-[3rem] bg-white px-1 border ">
            <LockOpenIcon />
            <input
              type="email"
              name="password"
              value={data.newPassword}
              placeholder="new Password"
              className=" w-full outline-none h-full px-1"
               onChange={InputDataChange}
            ></input>
          </div>
          <div className="flex  items-center h-[3rem] bg-white px-1 border ">
            <LockIcon />
            <input
              type="email"
              name="confirmPassword"
             value={data.confirmPassword}
              placeholder="confirm Password"
              className=" w-full outline-none h-full px-1"
               onChange={InputDataChange}
            ></input>
          </div>
          <div className="text-xl bg-orange-600 text-white text-center py-2 cursor-pointer ">
            <button type="submit" > Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
