import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid} from "@mui/x-data-grid"
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {toast} from "react-toastify"
import { setLoading } from '../../Utils/appSlices/userSlice';
import Loader from '../../Utils/Loader';
import useGetAllOrders from '../../Hooks/useGetAllOrders';
import { removeOrder } from '../../Utils/appSlices/orderSlice';


const OrderList = () => {
   useGetAllOrders();
    const orders=useSelector((store)=>store.orders.allOrders);
    const dispatch=useDispatch();
    const isLoading=useSelector((store)=>store.users.loading);
    
  
     const deleteOrderHandler=async(id)=>{
          try {
            dispatch(setLoading(true));
         
            const response=await fetch(`http://localhost:4000/api/v1/order/delete/${id}`,{
              method:"DELETE",
              credentials:"include",

            })
            console.log(response);
            const data=await response.json();
            console.log(data);
            if(response.ok){
              toast.success(data.message); 
              dispatch(removeOrder(id));  
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
        {field :"id", headerName:"Order Id",minWidth:250, flex:0.5,headerClassName: 'text-xl bg-[tomato] text-white' },
        {field :"status", headerName:"Status", minWidth:150,headerClassName: 'text-xl bg-[tomato] text-white'},
        {field :"qty", headerName:"Item Qty",minWidth:100,flex:0.3 ,type:"number",headerClassName: 'text-xl bg-[tomato] text-white'},
        {field :"amount", headerName:"Amount",minWidth:100,flex:0.3,type:"number",headerClassName: 'text-xl bg-[tomato] text-white'},
        {field :"actions", headerName:"Actions",minWidth:100,flex:0.3,type:"number",sortable:false,headerClassName: 'text-xl bg-[tomato] text-white',
            renderCell:(params)=>{
                return (
                    <>
                    <Link to={`/admin/order/update/${params.row.id}`}>
                    <EditIcon />
                    </Link>
                    <Button onClick={()=>deleteOrderHandler(params.row.id)} ><DeleteIcon className='text-black'/></Button>
                    </>
                )
            }
        },
         
     ]
const rows=[]
  orders&& orders.forEach((item)=>{
    rows.push({
        id:item._id,
        status:item.orderStatus,
        amount:item.paymentInfo.totalPrice,
        qty:item.orderItems.length

    });
  })

        


 return (
    <div className='flex h-screen'>
    <Sidebar />
     <div className='h-full overflow-auto mx-1 w-full no-scrollbar'>
    {isLoading? <Loader/>:<>
        <div className='text-3xl font-bold text-center my-8 '>All Orders</div>
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

export default OrderList;

