import React, { useState } from "react";
import KeyIcon from '@mui/icons-material/Key';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
    const navigate=useNavigate();
    const [data,setData]=useState({
        oldPassword:"",
        newPassword:"",
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
    const {oldPassword,newPassword,confirmPassword}=data;
    
    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set("oldPassword",oldPassword);
        myForm.set("newPassword",newPassword);
        myForm.set("confirmPassword",confirmPassword);
        
        try {
            const response=await fetch("https://e-commerce-backend-545f.onrender.com/api/user/password/update",{
                method:"PUT",
                credentials:"include",
                body:myForm
            })
            console.log(response);
            const data=await response.json();
            console.log(data)
            if(response.ok){
                navigate("/account")
                toast.success("password changed successfully!")
            }else{
                toast.error(data.message)
            }

            
        } catch (error) {
            toast.error("Something Went Wrong")
            console.log(error)
            
        }
    }
  return (
    <div className=" flex justify-center items-center  min-h-screen">
      <div className="w-[25%]  shadow-xl my-4 py-4 border-2  rounded-xl ">
        <div className="flex justify-center ">
        <div className="text-xl font-semibold text-gray-600 border-b-2 border-gray-400 w-[65%] py-4   ">
          <h1 className="text-center ">Update Password</h1>
        </div>
        </div>
        <form className="flex flex-col gap-10 mt-8 px-2 font-mono" onSubmit={handleFormSubmit}>
          <div className="flex  items-center h-[3rem] bg-white px-1 border  ">
            <KeyIcon />
            <input
              type="text"
              name="oldPassword"
              value={data.oldPassword}
              placeholder="Old Password"
              className=" w-full outline-none h-full px-1"
               onChange={InputDataChange}
            ></input>
          </div>
          <div className="flex  items-center h-[3rem] bg-white px-1 border ">
            <LockOpenIcon />
            <input
              type="text"
              name="newPassword"
              value={data.newPassword}
              placeholder="new Password"
              className=" w-full outline-none h-full px-1"
               onChange={InputDataChange}
            ></input>
          </div>
          <div className="flex  items-center h-[3rem] bg-white px-1 border ">
            <LockIcon />
            <input
              type="text"
              name="confirmPassword"
             value={data.confirmPassword}
              placeholder="confirm Password"
              className=" w-full outline-none h-full px-1"
               onChange={InputDataChange}
            ></input>
          </div>
          <div className="text-xl bg-orange-600 text-white text-center py-2 cursor-pointer ">
            <button type="submit" > Change</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
