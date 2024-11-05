const Order = require("../models/order_model");
const Product = require("../models/product_model");

const newOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      paymentInfo,
      orderItems,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      paymentInfo,
      orderItems,
      itemPrice,
      taxPrice,
      shippingPrice,
      orderStatus:"processing",
      totalPrice,
      createdAt:Date.now(),
      user:req.user._id
    });
    res.status(201).json({message:"order created successfully",order})
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getSingleOrder=async(req,res)=>{
try {
    const order=await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return res.status(404).json({message:"order not found"})
    }
    res.status(200).json({success:true,order})

    
} catch (error) {
    res.status(500).json({ msg: error.message });
}
}

// my orders
const myOrder=async(req,res)=>{
    try {
       
        const orders=await Order.find({user:req.user._id});
       
        res.status(200).json({success:true,orders})
    
        
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
    }

    // get all orders
    const getAllOrders=async(req,res)=>{
        try {
           
            const orders=await Order.find();
           let totalAmount=0;
           orders.forEach((order)=>{
            totalAmount+=order.paymentInfo.totalPrice;
           })
            res.status(200).json({success:true,orders,totalAmount})
        
            
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
        }
       

        // update order status
        const updateOrder=async(req,res)=>{
            
            try {
                const updateStock = async (productId, quantity) => {
                    const product = await Product.findById(productId); // Assuming you have a Product model
                
                    if (!product) {
                        return res.status(400).json("product not found")
                    }
                
                    product.stock -= quantity; // Decrease the stock by the ordered quantity
                
                    if (product.stock < 0) {
                        return res.status(400).json('Insufficient stock');
                    }
                
                    await product.save({ validateBeforeSave: false });
                };
                
                const order=await Order.findById(req.params.id);
                
                if(!order){
                    return res.status(404).json({message:"order not found"})
                }
                

                if(order.orderStatus==="Delivered"){
                    return res.status(201).json({msg:"you have already delivered this product"})
                }
                order.orderItems.forEach(async(o)=>{
                    await updateStock(o.id,o.quantity)
                })     
                
                order.orderStatus=req.body.paymentStatus;
                if(req.body.status==="Delivered"){
                    order.deliveredAt=Date.now();

                }  
                await order.save({validateBeforeSave:false})

                
               
                res.status(200).json({success:true,order})
            
                
            } catch (error) {
                console.log(error)
                res.status(500).json({ msg: error.message });
            }
            }
           

            const deleteOrder=async(req,res)=>{
                try {
                   
                  const order=await Order.findByIdAndDelete(req.params.id);
    
                    if(!order){
                        return res.status(404).json({message:"order not found"})
                    }
                    
                   
                    res.status(200).json({success:true,message:"order deleted successfully"})
                
                    
                } catch (error) {
                    res.status(500).json({ msg: error.message });
                }
                }


module.exports = {newOrder,getSingleOrder,myOrder,getAllOrders,updateOrder,deleteOrder};
