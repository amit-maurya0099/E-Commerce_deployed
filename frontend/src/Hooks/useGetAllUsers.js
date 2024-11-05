import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAllUsers } from "../Utils/appSlices/userSlice";


const useGetAllUsers=()=>{
  const dispatch=useDispatch();
    const getAllUser=async()=>{
        try {
            const response=await fetch("http://localhost:4000/api/user/details/all",{
                method:"GET",
                credentials:"include",
            })
            
            const data=await response.json();
           
            if(response.ok){
                dispatch(addAllUsers(data.users))
            }
        } catch (error) {
            console.log(error);
        }
    }
useEffect(()=>{
    getAllUser();
},[])
}

export default useGetAllUsers;