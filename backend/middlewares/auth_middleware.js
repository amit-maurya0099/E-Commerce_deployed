const jwt=require("jsonwebtoken");
const User = require("../models/user_model");

exports.isAuthenticated=async(req,res,next)=>{
    try {
        const {token}= req.cookies;
       
        

        if(!token){
            return next(res.status(404).json({message:"please login to access this resource"}))
        }

        const isVerified= jwt.verify(token,process.env.SECRET_KEY)
        
         
        const userData=await User.findOne({_id:isVerified.id}).select({password:0})
        
        req.user=userData;
        req.token=token;
        req.userId=userData._id;
         next();
        
        
    } catch (error) {
        res.status(400).json({msg:"something went wrong",error:error.message})
        
    }
}
exports.authorizeRole=(...role)=>{
    return (req,res,next)=>{
        
        if(!role.includes(req.user.role)){
            next(res.status(403).json({msg:`${req.user.role} is not allowed to access this resource`}))
        }
        
        next();
        
        
    }
}
