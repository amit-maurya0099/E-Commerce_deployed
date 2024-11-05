import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAdminProducts } from "../Utils/appSlices/productSlice";


const useGetAdminProducts=()=>{

    const dispatch=useDispatch();
    const getAdminProducts=async()=>{
    
        try {
            const response=await fetch("http://localhost:4000/api/v1/admin/products",{
                method:"GET",
                credentials:"include",
            })
            
            const data=await response.json();
            
             dispatch(addAdminProducts(data.products))
            
        } catch (error) {
           console.log(error);
        }
    
    }

    useEffect(()=>{
     getAdminProducts();
    },[dispatch])

}
export default useGetAdminProducts;