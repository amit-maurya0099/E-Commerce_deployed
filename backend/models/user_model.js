const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength:[30,"name should not exceed 30 characters"],
        minLength:[4,"name should have at least 4 characters"],

    },
    email:{
        type:String,
        unique:true,
        required:[true,"please enter your email"],
         validate:[validator.isEmail,"please enter a valid email"]


    },
    password:{
        type:String,
        required:[true,"please enter your email"],
        minLength:[8,"password must have at least 8 characters"],
    },
    avatar:{
        public_id:{
            type:String,
            
         },
         url:{
            type:String,
            
         }
    },
    role:{
        type:String,
        default:"user"
    },
    address:{
        type:String
    },
    phone:{
        type:Number
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date

},{timestamps:true})


userSchema.pre("save", async function(next){
    const user=this;
    if(!user.isModified("password")){
        next();
    }
    try {
     user.password=await bcrypt.hash(user.password,10);
        
    } catch (error) {
       next(error);
        
    }
})

userSchema.methods.generateToken=async function(){
    try {
        return jwt.sign({id:this._id,email:this.email},process.env.SECRET_KEY,{
            expiresIn:process.env.JWT_EXPIRY
        })
        
    } catch (error) {
        next(error);
        
    }

}

userSchema.methods.comparePassword=async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password)
}

// generating reset password token

userSchema.methods.getResetPasswordToken=async function(){

    const resetToken=crypto.randomBytes(20).toString("hex");

    // hashing reset token and add to userchema
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire=Date.now()+ 15*60*1000;
    return resetToken;

}

const User=mongoose.model("User",userSchema);
module.exports=User;