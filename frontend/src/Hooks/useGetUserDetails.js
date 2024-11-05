import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { addUserDetail, setLoading } from "../Utils/appSlices/userSlice";

const useGetUserDetails=(id)=>{
    const dispatch=useDispatch();
    const getUserDetail=async()=>{
        try {
            dispatch(setLoading(true))
            const response=await fetch(`https://e-commerce-backend-545f.onrender.com/api/user/details/${id}`,{
                method:"GET",
                credentials:"include",
            })
            
            const data=await response.json();
           
            if(response.ok){

             dispatch(addUserDetail(data.user));
            }
            dispatch(setLoading(false));
            
        } catch (error) {
            dispatch(setLoading(false));
            console.log(error)
        }

    }
    useEffect(()=>{
        getUserDetail();
    },[])

}

export default useGetUserDetails;