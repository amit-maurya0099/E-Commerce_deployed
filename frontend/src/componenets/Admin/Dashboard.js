import React from "react";
import Sidebar from "./Sidebar";
import { Chart as ChartJS } from 'chart.js/auto';  // important for execution of Line chart and Doughnut chart
import {Doughnut,Line} from "react-chartjs-2"
import useGetAdminProducts from "../../Hooks/useGetAdminProducts";
import { useSelector } from "react-redux";
import useGetAllUsers from "../../Hooks/useGetAllUsers";


const Dashboard = () => {
    useGetAdminProducts();
    useGetAllUsers();
    const products=useSelector((store)=>store.products.adminProducts)
    const users=useSelector((store)=>store.users.allUsers);

    let outOfStock=0;
    products && products.forEach((item)=>{
      if(item.stock === 0){
        outOfStock+=1
      }
    })
  

    const lineState={
        labels:["Initial Amount","Amount Earned"],
        datasets:[
            {
                label:"TOTAL AMOUNT",
               
                data:[0,4000]   
            }
        ]
    }
    const doughnutState={
        labels:["Out of Stock","InStock"],
        datasets:[
            {
            backgroundColor:["cyan","purple"],
            hoverBackgroundColor:"gray",
            data:[outOfStock,products.length-outOfStock]
        }
        ]
    }

    
  return (
    <div className="flex ">
      <Sidebar />
      <div className="h-screen overflow-auto mx-1 w-full">
        <p className="text-3xl font-bold text-center py-4 ">Dashboard</p>
        <div className="flex justify-center ">
          <div className="w-[90%] bg-blue-500  text-center text-white text-xl py-2">
            <p>Total Amount</p>
            <p> 200000</p>
          </div>
        </div>
        <div className="flex justify-center gap-8 pt-8">
          <div className="w-[200px] h-[200px] flex flex-col justify-center items-center text-2xl font-semi-bold bg-red-300 rounded-full">
            <p>Product</p>
            <p>{products && products.length}</p>
          </div>
          <div className="w-[200px] h-[200px] flex flex-col justify-center items-center text-2xl font-semi-bold bg-yellow-200 rounded-full">
            <p>Orders</p>
            <p>4</p>
          </div>
          <div className="w-[200px] h-[200px] flex flex-col justify-center items-center text-2xl font-semi-bold bg-[rgb(51,51,51)] text-white rounded-full">
            <p>Users</p>
            <p>{users && users.length}</p>
          </div>
        </div>
       <div className="w-[80%] m-auto">
        <Line data={lineState}/>
       </div>
       <div className="w-[30%] m-auto">
        <Doughnut data={doughnutState}></Doughnut>
       </div>

      </div>
    </div>
  );
};

export default Dashboard;
