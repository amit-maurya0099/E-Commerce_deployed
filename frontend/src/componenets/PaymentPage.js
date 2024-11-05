import React, { useState } from 'react';
import CheckOutSteps from './CheckOutSteps';
import MetaData from '../Utils/MetaData';
import { useSelector } from 'react-redux';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const PaymentPage = () => {
  
  const stripeApiKey=useSelector((store)=>store.orders.stripeApiKey); 
  if(!stripeApiKey) return;
  return (
   
     <Elements stripe={loadStripe(stripeApiKey)}>
    <MetaData title="Payment"/>
    <CheckOutSteps activeStep={2}/>  
    <Payment/>
   </Elements> 
  )
}

export default PaymentPage
