import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import {toast} from "react-toastify"

const UpdateOrder = () => {
    const navigate=useNavigate();
    const params=useParams();
    const id=params.id;
    const {allOrders}=useSelector((store)=>store.orders);
    const {allUsers}=useSelector((store)=>store.users);
    const shippingInfo=useSelector((store)=>store.cart.shippingInfo);
    const [paymentStatus,setPaymentStatus]=useState("Processing");
    const [orderUser,setOrderUser]=useState();
    const [order,setOrder]=useState();

    const getOrderUser=()=>{
        
        const order=allOrders.find((order)=>order._id=== id);
        setOrder(order);
        const orderUser=allUsers.find((user)=> order.user === user._id)
        setOrderUser(orderUser);
    }
     
   
 if(order){  const subTotal= (order.paymentInfo.itemPrice).toFixed(2);
     const tax=(0.18 * subTotal).toFixed(2)
     const shippingCharges= subTotal>1000 ? 0 : 40;
     var TotalAmt=parseFloat(subTotal)+parseFloat(tax)+parseFloat(shippingCharges)
    }

     const handleUpdateFormSubmit=async(e)=>{
      e.preventDefault();
      const status={
        paymentStatus
      }
         
      try {
        const response=await fetch(`http://localhost:4000/api/v1/order/update/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(status)
        });
        
         if(response.ok==true){
            const data=await response.json();
            
            toast.success("Status updated Successfully")
         }
         
         
      } catch (error) {
        console.log(error);
        toast.error(error.response)
      }
        
     }
     useEffect(()=>{
     
       getOrderUser();  
    
     },[])
     if(!order){
        return;
     }

  return (
    <>
    <div className='flex'>
    <Sidebar/>
    <div className=' flex flex-col  min-h-screen w-full'>    
       <div className=' flex  justify-between  items-center mt-16'>
        <div className='  border-r-2 border-gray-500 w-[70%] px-[5%] '>
          {orderUser &&   <div >
                <h1 className='text-2xl font-bold  '>Shipping Info</h1>
                <div className='flex flex-col mx-5 my-4 gap-2 text-lg '>
                    <p>Name : {orderUser.name}</p>
                    <p>Phone : {order.shippingInfo.phoneNumber}</p>
                    <p>Address : {order.shippingInfo.address +", " + order.shippingInfo.city + ", " + order.shippingInfo.state + ", " + order.shippingInfo.pinCode }</p>
                </div>

            </div>}
            <div>
                <h1 className='text-xl font-semibold'>Payment Status</h1>
                <p className='text-green-600 px-4 pt-2 text-lg'>PAID</p>
                <p className='px-4 pb-2'>Amount- ₹ {TotalAmt}</p>
                
             </div>
             <div>
                <h1 className='text-xl font-semibold'>Order Status</h1>
                <p className='text-green-600 px-4 py-2 text-lg'>{paymentStatus }</p>
                
             </div>
            <div className='flex flex-col gap-4 '>
                <h1 className='text-2xl font-bold'> Your Cart Items</h1>
                 <div className='flex flex-col gap-4 mx-6'>
                    {
                     order &&  order.orderItems.map((item)=>(
                        <div className='flex items-center justify-between' key={item.id}>
                            <div className='flex items-center'>
                            <img src={item.image} className='size-20 object-cover' alt="/"></img>
                            <p className='px-4' >{item.name}</p>
                            </div>
                            <div className='text-lg'>
                                <p>{item.quantity} x {item.price}= <span className='font-semibold text-gray-600'>₹ {(item.quantity * item.price).toFixed(2)}</span></p>
                            </div>
                        </div>
                    ))}
                 </div>

            </div>

        </div>
        <div className='flex flex-col  items-center w-[30%]'>
            <div className='my-8 border-b-2 border-gray-500 pb-4 w-[70%]  '>
           <h1 className='text-2xl font-bold text-center'> Process Order</h1>
           </div>
           <form className='  w-[70%] text-lg border-b-2 border-gray-500 pb-8' onSubmit={handleUpdateFormSubmit}>
            <select className='border-2 w-full py-1 outline-none'  onChange={(e)=>setPaymentStatus(e.target.value)}>
                <option>Choose Status</option>
                <option>Shipped</option>
                <option>Delivered</option>

                </select>     
           <button className=' w-full text-lg py-1 bg-orange-600 text-white text-center mt-4' type="submit">
            Update
            </button>
         
           </form>
        </div>


       </div>

    </div>
    </div>
    </>
  )
}

export default UpdateOrder;
