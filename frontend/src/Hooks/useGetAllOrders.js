import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAdminProducts } from "../Utils/appSlices/productSlice";
import { addAllOrders } from "../Utils/appSlices/orderSlice";


const useGetAllOrders=()=>{

    const dispatch=useDispatch();
    const getAllOrders=async()=>{
    
        try {
            const response=await fetch("http://localhost:4000/api/v1/order/all",{
                method:"GET",
                credentials:"include",
            })
            
            const data=await response.json();
           
              dispatch(addAllOrders(data.orders))
            
        } catch (error) {
           console.log(error);
        }
    
    }

    useEffect(()=>{
     getAllOrders();
    },[])

}
export default useGetAllOrders;