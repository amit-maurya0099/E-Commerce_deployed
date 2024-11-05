import React from "react";
import CartCard from "../Utils/CartCard";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"

const CartPage = () => {
  const navigate=useNavigate();
  const cartItems = useSelector((store) => store.cart.cartItems);
   
   
  const getGrossTotal = () => {
    let grossPrice = 0;
    cartItems.map((item) => (grossPrice += item.price * item.quantity));
    return grossPrice;
  };

  const grossPrice = getGrossTotal().toFixed(2);

  const buyNowHandler=()=>{
    navigate("/signUp?redirect=/shipping")

  }

  return (
    <div className="flex flex-col items-center h-full ">
      <div className=" flex w-[80%] bg-[#B4C8F8] text-black m-8 px-4 font-semibold text-lg">
        <span className="w-[60%]">Product</span>
        <div className="w-[40%] flex justify-between px-4">
          <span>Quantity</span>
          <span>Price</span>
        </div>
      </div>

      <div className=" flex flex-col gap-10 w-[80%] ">
        {cartItems.map((item) => (
          <CartCard key={item.id} item={item} />
        ))}
        
      {cartItems.length !==0 ?  <div className="flex flex-col items-end">
          <div className=" flex justify-between px-4 py-2 w-[30%]  border-t-2 border-[#B4C8F8] font-bold">
            <p className="text-lg font-serif">Gross Total</p>
            <p className="font-serif">{`₹ ${grossPrice}`}</p>
          </div>
          <div className="flex justify-center w-[30%]   my-4"><button className="bg-[#B4C8F8] text-black px-2 text-lg py-1 font-semibold w-[60%] rounded-[2rem] my-4 "
          onClick={buyNowHandler}
          >Buy Now</button></div>
        </div> :<div className="h-full flex items-center justify-center"><h1 className="font-semibold text-2xl">No Products in your Cart</h1></div>}
        
        
      </div>
    </div>
  );
};

export default CartPage;
