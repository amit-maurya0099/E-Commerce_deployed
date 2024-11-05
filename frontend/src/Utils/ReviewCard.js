import React from 'react'


const ReviewCard = ({review}) => {
   
  return (
    <div className='shadow-2xl border border-white m-4'>
      <div className='flex items-center bg-yellow-100 px-1'>
       
       <div className='flex items-center bg-green-700 text-white rounded-xl px-2 '><p> {review.rating} </p><img src="https://png.pngtree.com/png-vector/20240125/ourmid/pngtree-white-star-png-png-image_11494271.png" className=' size-6' alt="/"></img> </div>
        <p className='font-medium px-2'>{review.name}</p>
      </div>
      <div className='mt-2 px-1 text-wrap '>
        <p>{review.comment}</p>
      </div>
    </div>
  )
}

export default ReviewCard

