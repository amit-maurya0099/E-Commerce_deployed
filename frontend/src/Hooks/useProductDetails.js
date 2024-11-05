import { useDispatch } from "react-redux";
import { addProductDetails, setAllReviews } from "../Utils/appSlices/productSlice";
import { useEffect } from "react";
import { setLoading } from "../Utils/appSlices/userSlice";

const useProductDetails=(id)=>{
    const dispatch=useDispatch();
    const getProductDetail=async()=>{
        dispatch(setLoading(true))
        try {
            const response=await fetch(`https://e-commerce-backend-545f.onrender.com/api/v1/product/details/${id}`,{
                method:"GET",
                credentials:"include",
            })
            dispatch(setLoading(false))
         
            const data=await response.json();
            
            if(response.ok){
                dispatch(addProductDetails(data.product));
                dispatch(setAllReviews(data.product.reviews))
            }
            
        } catch (error) {
            dispatch(setLoading(false))
            console.log(error);
        }
    

    }
    useEffect(()=>{
        getProductDetail();
    },[])

}
export default useProductDetails;