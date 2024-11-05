import React, { useRef } from 'react'
import {useNavigate} from "react-router-dom"
import { useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe} from "@stripe/react-stripe-js";
import { toast } from 'react-toastify';
import { FaRegCreditCard } from "react-icons/fa6";
import { MdOutlineVpnKey } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { setLoading } from '../Utils/appSlices/userSlice';
import { createOrder } from '../Hooks/createOrder';
import { removeCartItems } from '../Utils/appSlices/cartSlice';

const Payment = () => {
     const dispatch=useDispatch();
    const elements=useElements();
    const stripe=useStripe();
    const payBtn=useRef(null);
   const orderInfo=JSON.parse(sessionStorage.getItem('orderInfo'));
    const {shippingInfo}=useSelector((store)=>store.cart)
    const {cartItems}=useSelector((store)=>store.cart)
    const {user,loading}=useSelector((store)=>store.users);
    const paymentData={
      amount:Math.round(orderInfo.TotalAmt * 100)
    }
    const navigate=useNavigate();
    
 const formSubmitHandler=async(e)=>{
 
    e.preventDefault();
    if(!stripe || !elements) {
      return;
    }

    payBtn.current.disabled=true;
    try {
       dispatch(setLoading(true));
      const response=await fetch("http://localhost:4000/api/v1/order/payment",{
        method:"POST",
        credentials:"include",
         headers:{
          "Content-Type":"application/json"
         },
        body:JSON.stringify(paymentData)
      },

    )
  
    const data = await response.json();
     const client_secret=data.my_client_secret;
     const cardElement = elements.getElement(CardNumberElement);
     if (!cardElement) {
       toast.error("Card information not found. Please check your card details.");
       payBtn.current.disabled = false;
       dispatch(setLoading(false));
       return;
     }
     
      const result=await stripe.confirmCardPayment(client_secret,{
        payment_method:{
          card:cardElement,
          billing_details:{
            name:user.name,
            email:user.email,
            address:{
              line1:shippingInfo.address,
              city:shippingInfo.city,
              state:shippingInfo.state,
               postal_code:shippingInfo.pinCode,
               country:shippingInfo.country
            }
          }
        }
      })
      if(result.error){
        dispatch(setLoading(false))
        payBtn.current.disabled=false;
        toast.error(result.error.message);
     
      }else{
        if(result.paymentIntent.status==="succeeded"){
        
            const paymentInfo={
              status:"paid",
              id:result.paymentIntent.id,
              itemPrice:orderInfo.subTotal,
              taxPrice:orderInfo.tax,
              shippingPrice:orderInfo.shippingCharges,
              totalPrice:orderInfo.TotalAmt
              
            }
            {
              createOrder({shippingInfo,paymentInfo,orderInfo,cartItems});
            }
           navigate("/orders");
           dispatch(setLoading(false));
           payBtn.current.disabled=false;
           toast.success("Payment SuccessFull");
           dispatch(removeCartItems);
           localStorage.setItem("cartItems",JSON.stringify([]))

        }
        else{
          dispatch(setLoading(false));
          payBtn.current.disabled=false;
          toast.error("Something went wrong while making payment");
        }
      }

      
    } catch (error) {
      
      payBtn.current.disabled=false;
      toast.error(error.response)
      console.log(error.message);
    }


   
 
} 
  return (
   
    <div className='px-[10%] py-10 flex justify-center '>
     
    <form onSubmit={formSubmitHandler} className='w-[30%]  bg-white shadow-xl '>
      <div className=' py-1 shadow-lg'><h1 className='font-semibold text-xl text-center  '>Card Info</h1></div>
       <div className='mt-4 flex flex-col gap-4 px-4 py-4'>
        <div className='flex gap-2 items-center '>
          <FaRegCreditCard className='text-3xl'/>
          <CardNumberElement className='border border-black py-2 w-full px-2 '/>
        </div>
        <div className='flex gap-2 items-center '>
          <MdEventNote className='text-3xl'/>
          <CardExpiryElement className='border border-black py-2 w-full text-lg px-2' />
        </div>
        <div className='flex gap-2 items-center '>
          <MdOutlineVpnKey className='text-3xl'/>
          <CardCvcElement className='border border-black py-2 w-full px-2' />
        </div>
        <div>
          <button className='bg-[#B4C8F8] w-full py-2' type='submit' ref={payBtn}> {loading ? "Loading...": <>Pay- ₹ {`${orderInfo.TotalAmt}`}</> }</button></div>
       </div>
    </form>

  
   
</div>

  )
}

export default Payment
