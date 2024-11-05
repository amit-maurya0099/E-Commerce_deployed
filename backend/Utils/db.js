const mongoose=require("mongoose");
const URI=process.env.DB_URI;

const ConnectDB=async()=>{
    try {
       await mongoose.connect(URI)
       console.log("mongodb connected successfully")
        
    } catch (error) {
        console.log("mongodb connection failed",error)
        
    }
}
module.exports=ConnectDB;