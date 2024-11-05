import React from 'react'
import CheckOutSteps from './CheckOutSteps'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {
    const navigate=useNavigate();
    const cartItems=useSelector((store)=>store.cart.cartItems);
    const user=useSelector((store)=>store.users.user);
    const shippingInfo=useSelector((store)=>store.cart.shippingInfo);
 
    const getSubtotal=()=>{
        let price=0;
        cartItems.map((item)=>(
             price+=(item.price*item.quantity)
        ))
        return price;
    }
    const subTotal=getSubtotal().toFixed(2);
     const tax=(0.18 * subTotal).toFixed(2)
     const shippingCharges= subTotal>1000 ? 0 : 40;
     const TotalAmt=parseFloat(subTotal)+parseFloat(tax)+parseFloat(shippingCharges)

     const handleProceedToPayment=()=>{
        const data={subTotal,tax,shippingCharges,TotalAmt};
        sessionStorage.setItem("orderInfo",JSON.stringify(data));
        navigate("/order/payment")
     }


  return (
    <div className=' flex flex-col  min-h-screen'>
       <CheckOutSteps activeStep={1}  /> 
       <div className=' flex  justify-between  items-center mt-16'>
        <div className='  border-r-2 border-gray-500 w-[70%] px-[5%] '>
            <div className=''>
                <h1 className='text-2xl font-bold  '>Shipping Info</h1>
                <div className='flex flex-col mx-5 my-4 gap-2 text-lg '>
                    <p>Name : {user.name}</p>
                    <p>Phone : {user.phone}</p>
                    <p>Address : {shippingInfo.address +" ," + shippingInfo.pinCode }</p>
                </div>

            </div>
            <div className='flex flex-col gap-4 '>
                <h1 className='text-2xl font-bold'> Your Cart Items</h1>
                 <div className='flex flex-col gap-4 mx-6'>
                    {
                    cartItems.map((item)=>(
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
           <h1 className='text-2xl font-bold text-center'> Order Summary</h1>
           </div>
           <div className='flex flex-col gap-4 w-[70%] text-lg border-b-2 border-gray-500 pb-8'>
           <div className='flex justify-between '>
             <p>Sub Total</p>
             <p>₹{subTotal}</p>
           </div>
           <div className='flex justify-between '>
             <p>Shipping Charges</p>
             <p>₹{shippingCharges}</p>
           </div>
           <div className='flex justify-between '>
             <p>GST</p>
             <p>₹{tax}</p>
           </div>
           </div>
           <div className='w-[70%] '>
           <div className=' flex justify-between text-xl font-semibold mt-2'>
            <p>Total Amt. : </p>
            <p>₹{TotalAmt}</p>
           </div>
           <button className='text-lg py-1 bg-orange-600 text-white text-center w-full mt-4'
           onClick={handleProceedToPayment}
           >Proceed to Pay</button>
           </div>
        </div>


       </div>

    </div>
  )
}

export default ConfirmOrder
