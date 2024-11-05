const { response } = require("express");
const Product=require("../models/product_model");
const { options } = require("../routers/productRoute");
const ApiFeatures = require("../Utils/apiFeatures");
const ErrorHandler = require("../Utils/errorHandler");
const cloudinary=require("cloudinary");
 

 const  createProduct=async(req,res)=>{
    
  let images=[];
  if(typeof req.body.images ==="string"){
    images.push(req.body.images)
  }else{
    images=req.body.images;
  }

  try {
  const imagesLink=[];
  for(let i=0; i< images.length; i++){
     const result=await cloudinary.v2.uploader.upload(images[i])
       
     imagesLink.push({
            public_id:result.public_id,
            url:result.secure_url
        })
     }
     
  
        req.body.images=imagesLink
        req.body.user=req.user.id;
       const product= await Product.create(req.body);
       res.status(200).json(product)
        
    } catch (error) {
       res.status(404).json({message:error.message});
        
    }
}
  // for user
const getAllProducts=async(req,res)=>{
    try {
        
        const resultperpage=8;
        const productCount=await Product.countDocuments();
        const apifeature=new ApiFeatures(Product.find(),req.query).search().filter()

        let products=await apifeature.query;
        let filterProductsCount=products.length;
       
        apifeature.pagination(resultperpage);
        
         products=await apifeature.query.clone();

         
        res.status(200).json({
            message:"product retrieved successfully",
            products,
            productCount,
            resultperpage,
            filterProductsCount
        })
     
        
    }catch (error) {
        return res.status(400).json(error.message)
        
    }
}

// get products for admin
 const getAdminProducts=async(req,res)=>{
   const products=await Product.find();
   res.status(200).json({
    message:"product retrieved successfully",
     products
   })

 }


const updateProductById=async(req,res,next)=>{
try {
    const id=req.params.id;
    let product=await Product.findById(id);
    if(!product){
        return next(new ErrorHandler(404,"product can not be found"))
    }
    let images=[];

    if(typeof req.body.images ==="string"){
        images.push(req.body.images)
    }else{
        images=req.body.images;
    }


    // deleting the older images if new images are provided
  if(images !==undefined){
    for(let i=0;i<product.images.length;i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    const imagesLink=[];
    for(let i=0; i< images.length; i++){
       const result=await cloudinary.v2.uploader.upload(images[i])
         
       imagesLink.push({
              public_id:result.public_id,
              url:result.secure_url
          })
       }
     req.body.images=imagesLink;

  }

 

    product=await Product.findByIdAndUpdate(id,req.body);
    res.status(200).json({message:"product updated successfully"})
    
} catch (error) {
    return res.status(400).json(error.message)
}
}

const deleteProductById=async(req,res,next)=>{
    const id=req.params.id;
    try {
       
        const product=await Product.findByIdAndDelete({_id:id});
        if(!product){
            return next(new ErrorHandler(404,"product not found"))
        }

        // deleting product image from cloudinary

        for(let i=0;i<product.images.length;i++){
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
        
        res.status(200).json({message:"product deleted successfully"})
        
    } catch (error) {
        return res.status(400).json(error.message)
    }
   
}

const getProductDetail=async(req,res,next)=>{
    try {
        const id=req.params.id;
        const product=await Product.findOne({_id:id});
        if(!product){
            return next(new ErrorHandler(404,"product not found"))
        }
        res.status(200).json({
            message:"product details retrieved successfully",
            product
        })

        
    } catch (error) {
        return res.status(400).json(error.message)
    }
}
// create product review

const createProductReview=async(req,res)=>{
    try {   
        const {comment,rating,productId}=req.body;
        const review={
            user:req.user.id,
            name:req.user.name,
            comment,
            rating:Number(rating)     
        }
        const product=await Product.findById(productId);
        const isReviewed= product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString())
        
        if(isReviewed){
            product.reviews.forEach((rev)=>{
                if(rev.user.toString()===req.user._id.toString()){
                    rev.comment=comment,
                    rev.rating=rating
                }
            })

        }
        else{
             product.reviews.push(review);
             product.numOfReviews=product.reviews.length
             
        }
        let sumofRating=0;
        product.reviews.forEach((rev)=>{
            sumofRating+=rev.rating
        })
        product.ratings=sumofRating/product.reviews.length
        

        await product.save({validateBeforeSave:false})
        res.status(200).json({message:"review submitted successfully",newReview:review})


        
    } catch (error) {

         return res.status(400).json(error.message)
    }

}

// get all reviews of a product 

const getAllReviewsByProductId=async(req,res)=>{
    try {
        const id=req.query.id;
        const product=await Product.findById(id);
        if(!product){
            return res.status(404).json({msg:`Can't get product with this id:${id}`})
        }
        const reviews=product.reviews;
        res.status(200).json({success:true,reviews});

        
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const deleteReview=async(req,res)=>{
    const revId=req.query.revId;
    const productId=req.query.productId;

    const product=await Product.findById(productId);
    
    const reviews=product.reviews.filter((rev)=>rev._id.toString()!==revId);
   
    
    
    

    let sum=0;
     reviews.forEach((rev)=>{
         sum+=rev.rating;
     })
      let ratings;
     (reviews.length==0)?(ratings=0):(ratings=sum/reviews.length);
     
    
      const numOfReviews=reviews.length;

     

     await Product.findByIdAndUpdate(productId,{
        reviews,ratings,numOfReviews},{new:true,runValidators:true,useFindAndModify:false}
     )
   
    
     res.status(200).json({message:`review deleted successfully`})
}
 const getQueryProducts=async(req,res)=>{
    try {
        const {keyword,page}=req.query;
        const products=await Product.find({name:{$regex : keyword, $options:"i"}});
        return res.status(200).json(products);

    } catch (error) {
        return res.status(200).josn(error)
        
    }
   

 }


    

module.exports={createProduct,getAllProducts,updateProductById,deleteProductById,getProductDetail,createProductReview,getAllReviewsByProductId,deleteReview,getAdminProducts,getQueryProducts}
