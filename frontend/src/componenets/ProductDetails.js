import React, {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductDetails from "../Hooks/useProductDetails";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "../Utils/ReviewCard";
import Loader from "../Utils/Loader";
import { addItemsToCart } from "../Utils/addItemsToCart";
import {toast} from "react-toastify"
import { addToCart } from "../Utils/appSlices/cartSlice";
import { Dialog,DialogActions,DialogContent,Button,DialogTitle, Rating } from "@mui/material";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const [rating,setRating]=useState(0);
  const [comment,setComment]=useState("");
  const [open,setOpen]=useState(false);
  useProductDetails(id);
  const product = useSelector((store) => store.products.product);
   
  
   
 
  const dispatch=useDispatch();
  const loading=useSelector((store)=>store.users.loading)
  
  let [count, setCount] = useState(1);


  
 

  const options = {
    edit: false,
    color: ("20", "20", "20", "0.1"),
    activeColor: "tomato",
    
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  const Increment = () => {
    if (count < product.stock) {
      product.stock !== 0 ? setCount(() => (count += 1)) : setCount(0);
    }
  };
  const Decrement = () => {
    if (count > 1) {
      setCount(() => (count -= 1));
    }
  };





  const addToCartHandler=async()=>{
    const quantity=count;
    if(product.stock !== 0){
     await addItemsToCart(id, quantity);
     const cartItems= await JSON.parse(localStorage.getItem('cartItems'));
     dispatch(addToCart(cartItems));
     toast.success("item added to cart")
    }else{
      toast.error("Item is Out Of Stock")
    }
    
  }

  const reviewSubmitHandler=async()=>{
    const myForm=new FormData();
    myForm.set("rating",rating)
    myForm.set("comment",comment)
    myForm.set("productId",id)
   
    setOpen(false);
  try {
    const response=await fetch("https://e-commerce-backend-545f.onrender.com/api/v1/product/review",{
      method:"POST",
      credentials:"include",
      body:myForm
    })
    console.log(response)
    const data=await response.json();
    console.log(data);
    if(response.ok){
      toast.success(data.message);
      
    }
    else{

      toast.error(data.message);
       navigate(`/signUp?redirect=/product/details/${id}`)
    }
    
    
    
  } catch (error) {
    console.log( "error",error);
  }


  }
 
 

  return (
    <div className="flex justify-evenly   w-full p-8  ">
      {loading?<Loader/>:<>
      <div className=" shadow-xl rounded-xl w-[35%]">
        <div className=" m-5 h-[70vh] ">
          <Carousel className="h-full rounded-xl">
            {product.images &&
              product.images.map((image) => (
                <img
                  key={image.url}
                  src={image.url}
                  alt="/"
                  className=" h-[70vh] w-full object-cover"
                ></img>
              ))}
          </Carousel>
        </div>
        {/* <div className=" m-5 flex justify-evenly">
          <div className="font-bold text-xl rounded-md bg-orange-500 h-12 flex items-center px-4 text-white hover:scale-105 " onClick={addToCartHandler}>
            <button>Add to Cart</button>
          </div>
          <div className="font-bold text-xl  rounded-md bg-orange-700 text-white  h-12 flex items-center px-4 hover:scale-105">
            <button onClick={()=>navigate("/shipping")}>Buy Now </button>
          </div>
        </div> */}
      </div>
      <div className="w-[40%] h-[85vh] shadow-xl rounded-xl overflow-auto no-scrollbar">
        <h1 className="text-3xl font-bold p-4">{product.name}</h1>
        <p className="text-lg px-4">{product.description}</p>
        <p className="text-2xl font-bold pt-4 pl-4">{`₹ ${product.price}`}</p>

        <div className="flex items-center px-4 ">
        {product.reviews &&  <ReactStars {...options} value={product.ratings} /> }
          <span>( {product.numOfReviews} reviews)</span>
        </div>
        <div className="px-4">
          <h1 className="font-semibold">Available Offers</h1>

          <div className="flex justify-center  ">
            <img
              src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90 "
              alt="/"
              className="h-4"
            ></img>
            <div className="px-1">
              Bank OfferGet ₹50 Instant Discount on first shopKart UPI
              transaction on order of ₹200 and aboveT&C
            </div>
          </div>

          <div className="flex justify-center  ">
            <img
              src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90 "
              alt="/"
              className="h-4"
            ></img>
            <div className="px-1">
              Bank OfferFlat ₹1000 off on HDFC Bank Credit Card EMI Txns,
              Tenure: 6 and 9 months, Min Txn Value: ₹15,000T&C
            </div>
          </div>

          <div className="flex justify-center  ">
            <img
              src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90 "
              alt="/"
              className="h-4"
            ></img>
            <div className="px-1">
              Bank OfferFlat ₹1250 off on HDFC Bank Credit Card EMI Txns,
              Tenure: 12 and 18 months, Min Txn Value: ₹15,000T&C
            </div>
          </div>

          <div className="flex   ">
            <img
              src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90 "
              alt="/"
              className="h-4"
            ></img>
            <div className="px-1">
              {" "}
              Special PriceGet extra 26% off (price inclusive of
              cashback/coupon)T&C
            </div>
          </div>
        </div>
        <p className="text-lg font-semibold px-4 ">
          Status:{" "}
          {product.stock === 0 ? (
            <span className="text-green-500"> Out of Stock</span>
          ) : (
            <span className="text-green-500">InStock</span>
          )}
        </p>
        <div className="flex p-4">
          <button
            className="border border-black bg-slate-600 text-white size-8 align-middle"
            onClick={Decrement}
          >
            -
          </button>
          <div className="border border-black w-10 text-center">{count}</div>
          <button
            className="border border-black bg-slate-600 text-white size-8 align-middle"
            onClick={Increment}
          >
            +
          </button>
          <button className="border border-black px-2 h-8 text-white bg-orange-500 rounded-2xl ml-8 hover:scale-105 "
          onClick={addToCartHandler} 
          >
            Add to Cart
          </button>
        </div>
        <div className=" px-4 border-b border-gray-400 shadow-xl">
          <div className="flex justify-between items-center shadow-xl">
            <h1 className="text-xl font-semibold  py-2 px-1">
              Ratings & Reviews
            </h1>
            <button className="mr-4 bg-slate-300 h-[60%] rounded-xl  px-2 "
            onClick={()=>setOpen(true)}>
              Rate Product
            </button>
          </div>
          <Dialog
           aria-labelledby="simple-dialog-title"
           open={open}
           onClose={()=>setOpen(false)}
           >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="flex flex-col gap-2">
              <Rating
                value={rating}
                onChange={(e)=>setRating(e.target.value)}
              ></Rating>
           
              <textarea 
              cols="50"
              rows="5"
              value={comment}
              className=" border-2 outline-none p-2 "
              onChange={(e)=>setComment(e.target.value)}
              >

              </textarea>
            </DialogContent>
             <DialogActions>
              <Button onClick={()=>setOpen(false)}>Cancel</Button>
              <Button onClick={reviewSubmitHandler}>Submit</Button>
             </DialogActions>
            
          </Dialog>
          {product.reviews && !product.reviews[0] ?(<div className=" text-center font-semibold">No Reviews Yet</div>):(        
           product.reviews && product.reviews.map((review)=>
            <div key={review._id}><ReviewCard  review={review} /> </div>)
          )
          
          }
          
        </div>
      </div>
      </>}
    </div>
  );
};

export default ProductDetails;
