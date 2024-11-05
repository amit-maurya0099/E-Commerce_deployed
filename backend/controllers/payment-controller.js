const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);


const processPayment=async(req,res)=>{
   
   try {
       
      const myPayment=await stripe.paymentIntents.create({
         amount:req.body.amount,
         currency:'inr'
        })
        res.status(200).json({success:true, my_client_secret:myPayment.client_secret})
   } catch (error) {
       console.log(error.message);
   }
  
}

 const sendStripeApiKey=async(req,res)=>{
  
    res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY})
}
module.exports={processPayment,sendStripeApiKey}