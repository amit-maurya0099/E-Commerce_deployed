import React from 'react'
import Login from './Login'
import Lottie from "react-lottie";
import Register from './Register'
import animationData from "../json/authlogin.json"; 
import MetaData from '../Utils/MetaData'
import { useSelector } from 'react-redux'
import Loader from '../Utils/Loader'

const SignUpPage = () => {
    const isRegisterForm=useSelector((store)=>store.users.isRegisterForm);
    const loading=useSelector((store)=>store.users.loading)
    

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData, 
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    
  return (
      <>
      <div className='flex min-h-screen justify-center items-center p-4  '>
      { loading? <Loader/>:<>
        <MetaData title="SignUp--Ecommerce"/>
      <div className='flex justify-center w-[80%] items-center  p-4 border-1 shadow-xl '>
        <div className='relative flex flex-col justify-center  w-[40%]  mx-4  rounded-xl '>

        <div className="my-16 w-[400px] h-[400px]">
        <Lottie options={defaultOptions} />
      </div>




            <h1 className='text-blue-600 text-center text-2xl font-semibold absolute top-4 left-[35%] '>
                Welcome Back 
            </h1>
            <div className='mb-8 absolute bottom-2 text-center  text-blue-600 text-md '>
                <p>To keep connected with us Please login with your personal information by email and password</p>

                </div>
            
         </div>
            
            <div className='w-[40%]  mx-4'>
             {
              
             (isRegisterForm)? <Register/>:<Login/>
             }
              </div>
           
        
      </div>
      </>}
    </div>
    </>
  )
}

export default SignUpPage
