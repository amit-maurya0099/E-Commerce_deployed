import Header from "./componenets/Header";

import {Route,Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./componenets/Home";
import ProductDetails from "./componenets/ProductDetails";
// import Products from "./componenets/Products";
import AllProduct from "./componenets/AllProducts";
import Error from "./componenets/Error";
import SignUpPage from "./componenets/SignUpPage";
import ProfilePage from "./componenets/ProfilePage";
import UpdateProfile from "./componenets/UpdateProfile";
import UpdatePassword from "./componenets/UpdatePassword";
import ForgotPassword from "./componenets/ForgotPassword";
import ResetPassword from "./componenets/ResetPassword";
import CartPage from "./componenets/CartPage";
import ShippingPage from "./componenets/ShippingPage";
import ConfirmOrder from "./componenets/ConfirmOrder";
import PaymentPage from "./componenets/PaymentPage";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import MenuCard from "./Utils/MenuCard";
import { setIsAuthenticated, setShowMenuCard,addUser } from "./Utils/appSlices/userSlice";
import Dashboard from "./componenets/Admin/Dashboard";
import ProtectedRoute from "./Utils/ProtectedRoute";
import ProductList from "./componenets/Admin/ProductList";
import NewProduct from "./componenets/Admin/NewProduct";
import UpdateProduct from "./componenets/Admin/UpdateProduct";
import OrderList from "./componenets/Admin/OrderList";
import UpdateOrder from "./componenets/Admin/UpdateOrder";
import UsersList from "./componenets/Admin/UsersList";
import UpdateUser from "./componenets/Admin/UpdateUser";
import ReviewsList from "./componenets/Admin/ReviewsList";
import Products from "./componenets/Products";
import { useEffect } from "react";
import { addStripeKey } from "./Utils/appSlices/orderSlice";
import Order from "./componenets/Order";
import QueryProducts from "./componenets/QueryProducts";






function App() {
  const dispatch=useDispatch();
  const location=useLocation();
  const navigate=useNavigate();
  const headerRoutes=["/","/products/all","/cart"]
  
  
  const getStripeKey=async()=>{
    try {
      const response=await fetch("http://localhost:4000/api/v1/order/stripeapikey",{
        method:"GET",
        credentials:"include"
      });
      const data=await response.json();
      
      if(response.ok){
        dispatch(addStripeKey(data.stripeApiKey));
      }
    
      
    } catch (error) {
       console.log(error);
    }
  }

  
  const showMenu=useSelector((store)=>store.users.showMenuCard)
  const isAuthenticated=useSelector((store)=>store.users.isAuthenticated)
  

  const handleMenuButton=()=>{
    if(showMenu){
      dispatch(setShowMenuCard(false))
    }else{
      dispatch(setShowMenuCard(true));
    }
  }
  const verfiAuth=()=>{
    const userData=localStorage.getItem('user');
    const user=JSON.parse(userData);
   
    if(user){
      dispatch(setIsAuthenticated(true));
      dispatch(addUser(user));
    }
  }
 
  

  useEffect(()=>{
    verfiAuth();
    getStripeKey();
    
   
  },[])
  
 
  return (
    <>
   {headerRoutes.includes(location.pathname)&& <Header/>}
   {!headerRoutes.includes(location.pathname)&& <GiHamburgerMenu className="fixed z-20 top-4 left-4 size-10 cursor-pointer"
     onClick={handleMenuButton}
   />}
    {showMenu && <MenuCard />}
  
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/product/details/:id" element={<ProductDetails/>}></Route>
      <Route path="/products/all" element={<AllProduct/>}></Route>
      <Route path="/products" element={<Products/>}></Route>
      <Route path="/products/query" element={<QueryProducts/>}></Route>
      <Route  path="*" element={<Error/>}/>
      <Route  path="/signUp" element={<SignUpPage/>}/>
    
       <Route
        path="/account"
        element={isAuthenticated ?<ProfilePage/> :<Error/>} 
      />
     
      <Route  path="/cart" element={<CartPage/>}/>
      <Route  path="/account/update" element={isAuthenticated ?<UpdateProfile/>:<Error/>}/>
      <Route  path="/password/update" element={isAuthenticated ?<UpdatePassword/>:<Error/>}/>
      <Route  path="/password/forgot" element={<ForgotPassword/>}/>
      <Route  path="http://localhost:4000/api/user/password/reset/:token" element={<ProtectedRoute element={ResetPassword}/>}/>
      <Route path="/shipping" element={isAuthenticated ?<ShippingPage/>:<Error/>}/>
      <Route path="/orders" element={isAuthenticated ?<Order/>:
      <><div className="text-xl  flex justify-center items-center h-screen w-screen">
        <h1 className="font-bold mr-8 ">Please login to get your order details  </h1>
      <button onClick={()=>navigate("/signUp")} className="px-3 py-1 text-white bg-blue-400 rounded-xl ">SignUp</button>
      </div>
      </>}/>
      <Route path="/order/confirm" element={isAuthenticated ?<ConfirmOrder/>:<Error/>}/>
      <Route path="/order/payment" element={isAuthenticated ?<PaymentPage/>:<Error/>}/>
       <Route path="/admin/dashboard" element={<ProtectedRoute element={Dashboard}/>}/>
       <Route path="/admin/products" element={<ProtectedRoute element={ProductList}/>}/>
       <Route path="/admin/product" element={<ProtectedRoute element={NewProduct}/>}/>
       <Route path="/admin/product/update/:id" element={<ProtectedRoute element={UpdateProduct}/>}/>
       <Route path="/admin/orders" element={<ProtectedRoute element={OrderList}/>}/>
       <Route path="/admin/order/update/:id" element={<ProtectedRoute element={UpdateOrder}/>}/>
       <Route path="/admin/users" element={<ProtectedRoute element={UsersList}/>}/>
       <Route path="/admin/user/update/:id" element={<ProtectedRoute element={UpdateUser}/>}/>
       <Route path="/admin/reviews" element={<ProtectedRoute element={ReviewsList}/>}/>
       </Routes>
    
    
   
    </>
    
    
    
  );
}

export default App;
