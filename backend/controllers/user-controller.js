const User = require("../models/user_model");
const sendToken = require("../Utils/jwtToken");
const sendEmail = require("../Utils/sendEmail");
const crypto=require("crypto");
const cloudinary=require("cloudinary");


// register a user

const register = async (req, res) => {
  const { name, email, password } = req.body;
  let avatar=req.body.avatar;

  try {
 
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "email already exist" });
    }
    const myCloud = await cloudinary.v2.uploader.upload(avatar,{ 
      width: 150,
      crop: "scale"
    });
    
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id:myCloud.public_id,
        url:myCloud.secure_url,
      },
    });
  return sendToken(user,201,res);
  } catch (error) {
   return res.status(404).json({ message: error.message });
  }
};

//  login user
const login=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        
    if(!user){
        return res.status(400).json({msg:"Invalid email or password"})
    }
    const ispasswordMatched=await user.comparePassword(password);
     
    if(ispasswordMatched){
      return sendToken(user,200,res);
    }else{
        return res.status(400).json({msg:"Invalid email or password"})
    }
        
    } catch (error) {
        console.log(error);
       return  res.status(404).json({ message: error});
    }

}
// log out user
 const logout=(req,res)=>{
  try {
    if(req.cookies.token){
    res.cookie("token",null,{
      expires:new Date(Date.now()),
      httpOnly:true,
      secure:true,
      sameSite:"None"

    })}

  res.status(200).json({message:"user logged out successfully"})
    
  } catch (error) {
    
     res.status(400).json({ message: "Something went wrong", error: error.message });
  
  }
 }

 const forgotPassword=async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
    
    if(!user){
      return res.status(404).json("user not found")  
      }

      const resetToken=await user.getResetPasswordToken();
     
      await user.save({validateBeforeSave:false});
     
      const resetPasswordUrl=`${process.env.FRONTEND_URL}https://e-commerce-backend-545f.onrender.com/api/user/password/reset/${resetToken}`
      const message=`your password token is :-"\n\n ${resetPasswordUrl}\n\n if you have not requested this mail then, please ignore it`
      
     
      try {
        await sendEmail({
          email:user.email,
          subject:"Ecommerce password recovery",
          message

        })
        
        res.status(200).json({success:true,
          message:`email sent to ${user.email} successfully`
        })
        
      } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return res.status(500).json({message:error.message})

        
      }
 
 }

 const resetPassword=async(req,res)=>{
  try {
    
    
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user=await User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}});
  
    
    if(!user){
      return res.status(400).json({message:"Invalid reset password token or has been expired"})
    }
    if(req.body.password!== req.body.confirmPassword){
      return res.status(400).json({message:"password does not match"})
    }
    user.password=req.body.password;

    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    // sendToken(user,200,res);
    return res.status(200).json({message:"password changed successfully"})
    
  } catch (error) {
   return res.status(500).json({error:error.message})
    
  }
 }

 // profile details
 const getUserDetails=async(req,res)=>{
  const id=req.user.id;
  const user=await User.findById(id).select({password:0});
  res.status(200).json(user);
 }

 const userPasswordUpdate=async(req,res)=>{
 try{ const user=await User.findById(req.user.id);
  const ispasswordMatched=await user.comparePassword(req.body.oldPassword);
  if(!ispasswordMatched){
    return res.status(404).json({message:"old password is incorrect"})
  }
  if(req.body.newPassword!==req.body.confirmPassword){
    return res.status(403).json({message:"password does not match"});
  }
  user.password=req.body.newPassword;
  await user.save();
  sendToken(user,200,res);
}catch(error){
  res.status(500).json(error.message);
}
 }
 //update profile
 const updateProfile=async(req,res)=>{
  try{
    const newData={
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    address:req.body.address,
    avatar:req.body.avatar
  }
  if(req.body.avatar !==""){
    const user=await User.findById(req.user.id)
    const imageId=user.avatar.public_id
    await cloudinary.v2.uploader.destroy(imageId)
  }
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{ 
    width: 150,
    crop: "scale"
  });
   newData.avatar={
     public_id:myCloud.public_id,
     url:myCloud.secure_url
   }


  const user=await User.findByIdAndUpdate(req.user.id,newData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });
  
  res.status(200).json({msg:"profile updated successfully",user});
}catch(error){
  res.status(401).json(error.message);
}

}

// get all users
const getAllUsers=async(req,res)=>{
 
   const users=await User.find().select({password:0});
   res.status(200).json({sucess:true,users});
   
}


// get user details
const getUserDetailsByID=async(req,res)=>{
  try {
    
    const user=await User.findById(req.params.id);
    
    if(!user){
      return res.status(400).json({msg:`user not found with this id:${req.params.id} `})
    }
    res.status(200).json({success:true,user});
    
  } catch (error) {
    res.status(500).json({error:error.message})
    
  }


}
const updateUserDetails=async(req,res)=>{

try{  const id=req.params.id;
  const newData={
    name:req.body.name,
    email:req.body.email,
    role:req.body.role,
  }

  const user=await User.findByIdAndUpdate(id,newData,{
    new:true,
    runValidators:true,
    useFindAndModify:false 
  })
  if(!user){
    return res.status(400).json({msg:`user not found with this id:${req.params.id} `})
  }
  res.status(200).json({msg:"profile updated successfully",user});
}catch(error){
  res.status(500).json({error:error.message})
}

}
// delete user

const deleteUserById=async(req,res)=>{
  const id=req.params.id;
 const user= await User.findByIdAndDelete(id);
  if(!user){
    return res.status(400).json({msg:`user not found with id:${id}`})
  }
  const imageId=user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);
  res.status(200).json({sucess:true,msg:"user deleted successfully"});

}
module.exports = {register,login,logout,forgotPassword,resetPassword,getUserDetails,userPasswordUpdate,updateProfile,getAllUsers,getUserDetailsByID,updateUserDetails,deleteUserById};
