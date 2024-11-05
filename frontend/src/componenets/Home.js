import React, { useEffect } from "react";
import ProductCard from "../Utils/ProductCard";
import MetaData from "../Utils/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import CategorySection from "./CategorySection";
import { addAllProducts } from "../Utils/appSlices/productSlice";
import Cookies from "js-cookie";
import { setIsAuthenticated } from "../Utils/appSlices/userSlice";
import Footer from "./Footer";



const Home = () => {
  
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products.allProducts);
  const isAuthenticated=useSelector((store)=>store.users.isAuthenticated)

  const fetchProducts = async () => {
    
    const response = await fetch("http://localhost:4000/api/v1/products",{ credentials:"include"});
    
    const data = await response.json();
   
    dispatch(addAllProducts(data.products));
    
  };
  const getProfileData = async () => {
   
    try {
      const response = await fetch("http://localhost:4000/api/user/profile/details", {
        method: "GET",
        credentials:"include"
      });
      
      const data = await response.json();
     
      // localStorage.setItem("user",JSON.stringify(data));
        
    } catch (error) {
      
      console.log(error);
    }
  };

  const token = Cookies.get("token");
  if (token) {
    dispatch(setIsAuthenticated(true));
    
  }
  if(isAuthenticated){
    getProfileData();
  }

 

  useEffect(() => {
    fetchProducts();
   

  }, []);

  return (
    <>
      <MetaData title="Home- Ecommerce" />

    
      <div className="w-full   text-black py-2 pb-8">
        <div className="h-[40%]">
          <Carousel >
            <img
              src="https://media.istockphoto.com/id/1483357835/photo/businessman-using-a-laptop-with-online-shopping-concept-marketplace-website-with-virtual.jpg?s=612x612&w=0&k=20&c=dnjB7Psonoidcb9lhRykBCmvzFDxCyyzdGusSEEBz1w="
              alt="/"
              className="object-cover h-[350px] w-full"
            ></img>
            <img
              src="https://media.istockphoto.com/id/1311969748/photo/businessman-touching-digital-business-icon-marketing-and-shopping-social-online-network.jpg?s=612x612&w=0&k=20&c=ShCwEiMX4HdxKU-nAfqPJCF-SXqa8kdZK3cQBmaLtDM="
              alt="/"
               className="object-cover h-[350px] w-full "
            ></img>
               <img
              src="https://media.istockphoto.com/id/1051616786/photo/digital-marketing-businessman-working-with-laptop-computer-tablet-and-smart-phone-modern.jpg?s=612x612&w=0&k=20&c=J2A6-q3RtqbISouQVBgpYtI1Ft9KeVsANUFHgG4Olbc="
              alt="/"
               className="object-cover h-[350px] w-full "
            ></img>
          </Carousel>
        </div>
        <CategorySection />
        <div>
          <h1 className="font-bold text-3xl text-center text-slate-600 underline m-5">
            Featured Products
          </h1>
        </div>

        <div className="flex gap-20 flex-wrap justify-center ">
          {products.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <Footer/>

    </>
  );
};

export default Home;
