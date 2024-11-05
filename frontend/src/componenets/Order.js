import React, { useEffect, useState } from 'react'
import { MdOutlineMms } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { addAllOrders } from '../Utils/appSlices/orderSlice';
import { useLocation } from 'react-router-dom';

const Order = () => {
   const dispatch=useDispatch();
   const location=useLocation();
    const orders=useSelector((store)=>store.orders.allOrders);
    const [Orders,setOrders]=useState(orders);

  const getAllOrders=async()=>{
    try {
      const response=await fetch("https://e-commerce-backend-545f.onrender.com/api/v1/order/me",{
        method:"GET",
        credentials:"include"
      });
      const data=await response.json();
      
      dispatch(addAllOrders(data.orders));
        setOrders(data.orders)

      
    } catch (error) {
       console.log(error)
    }

  }
  
  useEffect(()=>{
    getAllOrders();
  },[location])
 
  if(!orders){
    return;
   }
  return (
    <div className='px-[10%] py-4 w-screen h-screen overflow-auto'>
      <h1 className='flex font-bold text-xl underline justify-center '>My Orders</h1>
      <table className='w-full mt-4 border border-black '>
        <thead className='border border-black bg-[#B4C8F8] '>
          <th>Sr.No</th>
          <th>Product</th>
          <th>orderId</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Amount(₹)</th>
        </thead>
        <tbody>
          {
               Orders.map((order,index)=>(
                <tr key={order._id} className='text-center even:bg-slate-200 '>
                 <td>{index+1}</td> 
                <td>{order.orderItems.map((item)=><p key={item.id}>  {item.name}</p>)}</td>
                <td>{order._id}</td>
                <td>{order.orderItems.map((item)=><p key={item.id}>{item.quantity}</p>)}</td>
                <td>{order.orderStatus}</td>
                <td>{order.paymentInfo.totalPrice}</td>
                
                
                </tr>
               ))
            }
          
        </tbody>
      </table>
    </div>
  )
}

export default Order
