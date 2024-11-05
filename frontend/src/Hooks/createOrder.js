
export const createOrder=async({orderInfo,paymentInfo,shippingInfo,cartItems})=>{
     
      const orderData = {
         itemPrice: orderInfo.subTotal,
         taxPrice: orderInfo.tax,
         shippingPrice: orderInfo.shippingCharges,
         totalPrice: orderInfo.TotalAmt,
         orderItems: cartItems,
         shippingInfo: shippingInfo,
         paymentInfo: paymentInfo
     };
       
   try {
      const response=await fetch("https://e-commerce-backend-545f.onrender.com/api/v1/order/new",{
        method:"POST",
        credentials:"include",
        headers:{
           "Content-Type":"application/json"
        },
        body:JSON.stringify(orderData)
      }) 
      const data=await response.json(); 
   

   } catch (error) {
      console.log(error);

    
   }
}