import React from 'react'
import useGetAdminProducts from '../../Hooks/useGetAdminProducts'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid} from "@mui/x-data-grid"
import Sidebar from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {toast} from "react-toastify"
import { removeProduct } from '../../Utils/appSlices/productSlice';
import { setLoading } from '../../Utils/appSlices/userSlice';
import Loader from '../../Utils/Loader';


const ProductList = () => {
    useGetAdminProducts();
    const products=useSelector((store)=>store.products.adminProducts);
    const dispatch=useDispatch();
    const isLoading=useSelector((store)=>store.users.loading);
    const navigate=useNavigate();
  
     const deleteProductHandler=async(id)=>{
          try {
            dispatch(setLoading(true));
         
            const response=await fetch(`http://localhost:4000/api/v1/product/delete/${id}`,{
              method:"DELETE",
              credentials:"include",
            })
            console.log(response);
            const data=await response.json();
            console.log(data);
            if(response.ok){
              toast.success(data.message); 
              dispatch(removeProduct(id));  
            }else{
              toast.error(data.message)
            }
           dispatch(setLoading(false))
          } catch (error) {
            dispatch(setLoading(false));
            console.log(error)
          }
     }

     const columns=[
        {field :"id", headerName:"Product Id",minWidth:150,flex:0.5,headerClassName: 'text-xl bg-[tomato] text-white' },
        {field :"name", headerName:"Name", minWidth:270,flex:1,headerClassName: 'text-xl bg-[tomato] text-white'},
        {field :"stock", headerName:"Stock",minWidth:100,flex:0.3 ,type:"number",headerClassName: 'text-xl bg-[tomato] text-white'},
        {field :"price", headerName:"Price",minWidth:100,flex:0.3,type:"number",headerClassName: 'text-xl bg-[tomato] text-white'},
        {field :"actions", headerName:"Actions",minWidth:100,flex:0.3,type:"number",sortable:false,headerClassName: 'text-xl bg-[tomato] text-white',
            renderCell:(params)=>{
                return (
                    <>
                    <Link to={`/admin/product/update/${params.row.id}`}>
                    <EditIcon />
                    </Link>
                    <Button onClick={()=>deleteProductHandler(params.row.id)} ><DeleteIcon className='text-black'/></Button>
                    </>
                )
            }
        },
         
     ]
const rows=[]
  products&& products.forEach((item)=>{
    rows.push({
        id:item._id,
        stock:item.stock,
        price:item.price,
        name:item.name

    });
  })

        


 return (
    <div className='flex'>
    <Sidebar />
     <div className='h-screen overflow-auto mx-1 w-full '>
    {isLoading? <Loader/>:<>
        <div className='text-3xl font-bold text-center my-8'>All Products</div>
        <DataGrid
            columns={columns} 
            rows={rows}
            disableRowSelectionOnClick
            disableColumnSelector
            disableColumnResize
            disableAutosize 
            pageSize={10}
            
            />
    </>}
            </div>
    </div>
  )
}

export default ProductList

