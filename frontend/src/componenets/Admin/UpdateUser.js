import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Button } from '@mui/material';
import {toast} from "react-toastify"
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Utils/appSlices/userSlice';
import Loader  from '../../Utils/Loader';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import useGetUserDetails from '../../Hooks/useGetUserDetails';



const UpdateUser = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {id}=useParams();
     useGetUserDetails(id);
    const user=useSelector((store)=>store.users.userDetail);
      console.log(user); 
   
const isLoading=useSelector((store)=>store.users.loading);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [role,setRole]=useState("");

const UpdateFormSubmitHandler=async(e)=>{
e.preventDefault();
const myForm=new FormData();

myForm.set("name",name)
myForm.set("email",email)
myForm.set("role",role)

try {
    dispatch(setLoading(true))
    const response=await fetch(`https://e-commerce-backend-545f.onrender.com/api/user/details/update/${id}`,{
        method:"PUT",
        credentials:"include",
        body:myForm
    })
    console.log(response);
    const data=await response.json();
    console.log(data);
    if(response.ok){
        toast.success(" User Updated Successfully")
       navigate("/admin/users")
    }else{
        toast.error(data.message);
    }
    dispatch(setLoading(false));
    
} catch (error) {
    dispatch(setLoading(false));
    console.log(error);
    
}

}
useEffect(()=>{
  setName(user.name) 
  setEmail(user.email) 
  setRole(user.role) 
},[user])

return (
    <div className='flex'>
        <Sidebar/>
        <div className='bg-gray-300 h-screen w-full' >
            {isLoading? <Loader/>:<>
          <div className='bg-white m-auto w-[25%] mt-16 py-4 shadow-xl'>  
         <h1 className='text-3xl font-bold text-center '>Update User</h1>
         <form className=' w-[90%] m-auto  bg-white flex flex-col gap-10 justify-evenly px-4 py-4 mt-4'onSubmit={UpdateFormSubmitHandler}>
               <div className='flex items-center border-2 h-10 pl-2'>
                <PersonIcon/>
                <input
                   className='text-lg w-full outline-none ml-1 '
                   type="text"
                   placeholder='Product Name'
                   value={name}
                   onChange={((e)=>setName(e.target.value))}
                   ></input>
               </div> 
               <div className='flex items-center border-2 h-10 pl-2'>
                <EmailIcon/>
                <input
                   className='text-lg w-full outline-none ml-1 px-1'
                   type="email"
                   placeholder='Email'
                   value={email}
                   onChange={((e)=>setEmail(e.target.value))}
                   ></input>
               </div>
              
               
               <div className='flex items-center border-2 h-10 pl-2 '>
                <VerifiedUserIcon/>
                <select
                   className='text-lg w-full outline-none ml-1 ' 
                   value={role}
                   onChange={((e)=>setRole(e.target.value))}>
                    <option >Choose Role</option>
                    <option>user</option>
                    <option>admin</option>
                   </select>
               </div>
              
               <div className='w-full bg-gray-300 text-white text-center cursor-pointer '><Button type="submit" disabled={role ==="Choose Role"}>Update</Button></div>


         </form>
         </div>
         </>}
        </div>
      
    </div>
  )
}

export default UpdateUser

