 import { useDispatch} from "react-redux";
import { useEffect} from "react";
import { addAllProducts, addFilterProductsCount, addProductCount, addResultPerPage } from "../Utils/appSlices/productSlice";
import { setLoading } from "../Utils/appSlices/userSlice";


const useAllProducts = (page,price,rating,category) => {
  const dispatch = useDispatch();
  
  
  const getAllProducts = async () => {
     dispatch(setLoading(true))
    try {
       let link=`http://localhost:4000/api/v1/products?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`
       if(category){
        link=`http://localhost:4000/api/v1/products?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
       }
      const response =await fetch(link,{
        method:"GET",
        credentials:"include",
        
      })
     
      const data=await response.json();
     
      dispatch(setLoading(false))
      
      dispatch(addResultPerPage(data.resultperpage))
      dispatch(addAllProducts(data.products))
      dispatch(addProductCount(data.productCount))
      dispatch(addFilterProductsCount(data.filterProductsCount))
      
      
    } catch (error) {
      dispatch(setLoading(false))
      console.log("error while fetching all products",error);
      
      
    }
       
  };

  useEffect(() => {
    
     getAllProducts();
    
  }, [dispatch,page,price,category,rating]);
};

export default useAllProducts;
