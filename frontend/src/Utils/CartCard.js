import React, { useState } from 'react'
import { addItemsToCart } from './addItemsToCart';
import { useDispatch } from 'react-redux';
import { addToCart } from './appSlices/cartSlice';
import { removeItemFromCart } from './removeItemFromCart';
import { toast } from 'react-toastify';

const CartCard = ({item}) => {
  const dispatch=useDispatch();
   let [count,setCount]=useState(item.quantity);
  
   const Increment= async(id)=>{
    if(count<item.stock){
        setCount(()=>count+=1)
    }
   await addItemsToCart(id,count);
    const cartItems= await JSON.parse(localStorage.getItem('cartItems'));
    dispatch(addToCart(cartItems));

   }
   const Decrement=async(id)=>{
    if(count>1){
        setCount(()=>count-=1);
    }
   await addItemsToCart(id,count);
    const cartItems= await JSON.parse(localStorage.getItem('cartItems'));
    dispatch(addToCart(cartItems));
   }

   const removeHandler=async(id)=>{
    removeItemFromCart(id);
    const cartItems= await JSON.parse(localStorage.getItem('cartItems'));
    dispatch(addToCart(cartItems));
    toast.success("Item removed from cart")
    
   }
    
    
  return (
    <div className='flex shadow-2xl bg-white rounded-lg'>
        <div className=' flex w-[60%]'>
            <img src={item.image} alt="/" className='size-32 object-cover rounded-lg'></img>
            <div className='flex flex-col justify-evenly mx-4'>
                <p className='font-semibold italic'>{item.name}</p>
                <p>{`₹${item.price}`}</p>
                <div>
                <button className=' font-semibold bg-[#B4C8F8] text-black px-2 py-1'
                  onClick={()=>removeHandler(item.id)}
                >Remove</button>
                </div>
                
            </div>
        </div>
       <div className='flex justify-between items-center w-[40%] pr-4'> 
       <div className="flex">
          <button
            className="border border-black bg-slate-600 text-white size-8 align-middle"
             onClick={()=>Decrement(item.id)}
          >
            -
          </button>
          <div className="border border-black w-10 text-center">{count}</div>
          <button
            className="border border-black bg-slate-600 text-white size-8 align-middle"
            onClick={()=>Increment(item.id)}
          >
            +
          </button>
        
        </div>
        <div className='font-semibold font-serif '>
            <p>{`₹ ${(count*(item.price)).toFixed(2)}`}</p>
            </div> 
        </div>
    </div>
  )
}

export default CartCard
