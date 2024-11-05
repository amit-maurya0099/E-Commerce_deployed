require('dotenv').config();
const express = require("express");
const app = express();
const productRoute=require("./routers/productRoute");
const userRoute=require("./routers/user-route")
const orderRoute=require("./routers/orderRoute")
const paymentRoute=require("./routers/paymentRoute")
const ConnectDB = require('./Utils/db');
const errorMiddlware = require('./middlewares/error_middleware');
const cookieParser=require("cookie-parser")
const cors = require('cors')
const cloudinary=require("cloudinary")
const bodyParser=require("body-parser")
const fileUpload=require("express-fileupload")


 const port=process.env.PORT ; 

app.use(cors({
  origin:'http://localhost:3000',
  method:["GET","PUT","POST","DELETE"],
  credentials:true
}
));
 app.use(express.json());
  app.use(bodyParser.urlencoded({limit: "50mb", extended:true}))
 app.use(fileUpload())
 app.use(cookieParser());
 app.use("/api/v1",productRoute)
 app.use("/api/user",userRoute);
 app.use("/api/v1",orderRoute);
 app.use("/api/v1/order",paymentRoute);




ConnectDB().then(()=>{
   const server= app.listen(parseInt(port), () => {
        console.log(`Server is running on port ${port}`);
    });
})

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME ,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})



