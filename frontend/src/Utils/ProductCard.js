import React from 'react'
import ReactStars from "react-rating-stars-component"
import { Link } from 'react-router-dom'
const options={
    edit:false,
    color:("20","20","20","0.1"),
    activeColor:"tomato",
    isHalf:true,
    size:window.innerWidth< 600 ?20:25
}


const ProductCard = ({product}) => {
  return (
   <Link to={`/product/details/${product._id}`}> <div  className='  transform transition-all hover:scale-105 w-[250px] h-[400px]  shadow-2xl '>
         <img src={product.images[0].url} alt="/" className='w-full h-[70%] object-cover '></img>
        <p className='pt-1 pl-1 text-wrap'>{product.name}</p>
        <div className='flex items-center pl-1 '>
          <ReactStars {...options} value={product.ratings}/><span >( {product.numOfReviews} reviews)</span>
          
        </div>
        <span className='font-semibold pl-1'>{"Rs "+product.price}</span>
      </div></Link>
  )
}

export default ProductCard
