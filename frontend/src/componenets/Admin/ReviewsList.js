import React, { useState } from 'react'
import Sidebar from './Sidebar'
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, setAllReviews } from '../../Utils/appSlices/productSlice';
import {toast} from "react-toastify"

const ReviewsList = () => {
    const dispatch=useDispatch();
    const [id,setId]=useState();
    const reviews=useSelector((store)=>store.products.allReviews)

    const columns=[
        {field :"id", headerName:"Review Id",minWidth:100, flex:0.2, headerClassName: 'text-xl bg-[tomato] text-white' },
        {field :"user", headerName:"User", minWidth:100, flex:0.2, headerClassName: 'text-xl bg-[tomato] text-white'},
        {field :"comment", headerName:"Comment",minWidth:200, flex:0.5, type:"number",headerClassName: 'text-xl bg-[tomato] text-white'},
        {field :"rating", headerName:"Rating",minWidth:100, flex:0.2, type:"number",headerClassName: 'text-xl bg-[tomato] text-white'},
        {field :"actions", headerName:"Actions",minWidth:100, flex:0.2, type:"number",sortable:false,headerClassName: 'text-xl bg-[tomato] text-white',
            renderCell:(params)=>{
                return (
                    <>
                    <Button onClick={()=>deleteReviewHandler(params.row.id)} ><DeleteIcon className='text-black'/></Button>
                    </>
                )
            }
        },
         
     ]
const rows=[]
  reviews&& reviews.forEach((item)=>{
    rows.push({
        id:item._id,
        user:item.name,
        comment:item.comment,
        rating:item.rating

    });
  })

const handleFormSubmit=async(e)=>{
    e.preventDefault();
    try {
        const response=await fetch(`https://e-commerce-backend-545f.onrender.com/api/v1/product/reviews?id=${id}`,{
            method:"GET",
            credentials:"include",
        })
        console.log(response);
        const data=await response.json();
        console.log(data);
     if(response.ok){
        dispatch(setAllReviews(data.reviews));
     }
        
    } catch (error) {
        console.log(error);
        
    }
}
const deleteReviewHandler=async(revId)=>{
    try {
        const response=await fetch(`https://e-commerce-backend-545f.onrender.com/api/v1/product/review?productId=${id}&revId=${revId}`,{
            method:"DELETE"
        })
        console.log(response)
        const data=await response.json();
        console.log(data);
        if(response.ok){
            dispatch(deleteReview(revId));
            toast.success("review deleted successfully")
        }
        
    } catch (error) {
        console.log(error);
    }


}
  return (
    <div className='flex'>
       <Sidebar/>
        <div className='min-h-screen flex flex-col w-full bg-slate-200'>
            <div className='  flex  justify-center items-center'>
                <form className=' bg-white w-[20%]  shadow-xl py-4 flex flex-col gap-3  items-center justify-center mt-8' onSubmit={handleFormSubmit}>
                    <h1 className='text-xl font-semibold text-center'>Enter Product Id</h1>
                    <div className='h-10 bg-white border-2 align-middle'>
                    <StarPurple500Icon/>
                        <input type="text" placeholder='Id' className=' align-middle h-full outline-none pl-1 ' value={id} onChange={(e)=>setId(e.target.value)}></input></div>
                    <button className='w-[80%] h-10 bg-orange-500 text-white text-xl' type="submit" >Enter</button>
                </form>
            </div>
            <div className='w-full  px-2'>
                <h1 className='text-3xl font-bold mt-8 text-center'>Reviews</h1>
              {(reviews && reviews.length !== 0) ?  <div className='my-4'>
               <DataGrid
                    columns={columns} 
                     rows={rows}
                    disableRowSelectionOnClick
                    disableColumnSelector
                    disableColumnResize
                    disableAutosize 
                    pageSize={10}

            
            />
                </div>: <> <p className='text-2xl text-center font-semibold mt-10 '>No Reviews Found</p></>}
           


            </div>
           
            

        </div>
      
    </div>
  )
}

export default ReviewsList
