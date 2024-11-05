const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter product price"],
        maxLength:[8,"price can't exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
         public_id:{
            type:String,
            required:true
         },
         url:{
            type:String,
            required:true
         }

        }
       
    ],
    category:{
        type:String,
        required:[true,"please specify the category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        default:1,
        maxLength:[4,"stock can't exceed 4 characters"]
    },
    numOfReviews:{
        type:Number,
        default:0 

    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
           required:true
         },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
             required:true
        }

    }],
    user:{
       type:mongoose.Schema.ObjectId,
       ref:"User",
      required:true
       

    }


    

},{timestamps:true});

const Product=mongoose.model("Product",productSchema);
module.exports=Product;