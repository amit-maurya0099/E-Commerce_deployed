import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid} from "@mui/x-data-grid"
import Sidebar from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {toast} from "react-toastify"
import { removeUser, setLoading } from '../../Utils/appSlices/userSlice';
import Loader from '../../Utils/Loader';
import useGetAllUsers from '../../Hooks/useGetAllUsers';


const UsersList = () => {
     useGetAllUsers();
    const users=useSelector((store)=>store.users.allUsers);
    const dispatch=useDispatch();
    const isLoading=useSelector((store)=>store.users.loading);
   
  
     const deleteUserHandler=async(id)=>{
          try {
            dispatch(setLoading(true));
         
            const response=await fetch(`https://e-commerce-backend-545f.onrender.com/api/user/delete/${id}`,{
              method:"DELETE",
              credentials:"include",
            })
            console.log(response);
            const data=await response.json();
            console.log(data);
            if(response.ok){
              toast.success(data.message); 
              dispatch(removeUser(id));  
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
        {field :"id", headerName:"userId",minWidth:150,flex:0.5,headerClassName: 'text-xl bg-[tomato] text-white' },
        {field :"email", headerName:"Email", minWidth:200,flex:0.5,headerClassName: 'text-xl bg-[tomato] text-white'},
        {field :"name", headerName:"Name",minWidth:100,flex:0.3 ,type:"number",headerClassName: 'text-xl bg-[tomato] text-white'},
        {field :"role", headerName:"Role",minWidth:100,flex:0.3,type:"number",headerClassName: 'text-xl bg-[tomato] text-white'},
        {field :"actions", headerName:"Actions",minWidth:100,flex:0.3,type:"number",sortable:false,headerClassName: 'text-xl bg-[tomato] text-white',
            renderCell:(params)=>{
                return (
                    <>
                    <Link to={`/admin/user/update/${params.row.id}`}>
                    <EditIcon />
                    </Link>
                    <Button onClick={()=>deleteUserHandler(params.row.id)} ><DeleteIcon className='text-black'/></Button>
                    </>
                )
            }
        },
         
     ]
const rows=[]
  users&& users.forEach((user)=>{
    rows.push({
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,

    });
  })

        


 return (
    <div className='flex'>
    <Sidebar />
     <div className='h-screen overflow-auto mx-1 w-full '>
    {isLoading? <Loader/>:<>
        <div className='text-3xl font-bold text-center my-8'>All Users</div>
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

export default UsersList

