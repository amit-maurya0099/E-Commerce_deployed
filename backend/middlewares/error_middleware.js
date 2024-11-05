const errorMiddlware=(err,req,res,next)=>{
    const status=err.statusCode||500;
    const message=err.message || "Internal Server Error"  
    return res.status(status).json({status,message})
    };
    module.exports=errorMiddlware;