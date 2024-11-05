
const sendToken=async(user,statusCode,res)=>{
    const token=await user.generateToken();
    const options={
        expires: new Date(Date.now()+ process.env.COOKIE_EXPIRE *24*60*60*1000),
        httpOnly:true,
        secure:true,
        sameSite:"None"
    }
   
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        token,
        user
    }) 

}
module.exports=sendToken;