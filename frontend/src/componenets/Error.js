import React from 'react'
import {Link} from "react-router-dom"



const Error = () => {
  return (
    <div className=' flex justify-center  h-screen  '>
      <div className=' w-[50%] align-middle bg-gradient-to-b from-violet-600 '>
        <h1 className='text-[10rem] text-center text-black '>404</h1>
        <h3 className='text-[2rem] text-center'>Sorry! Page not found</h3>
        <p className='text-center'>Oops.. It seems the page you are trying to access does not exist. If you believe there is an issue , feel free to report it and we will look into it. </p>
       <div className="text-center mt-4">
         <Link to="/" className ="text-xl rounded-[10px] bg-violet-800 text-white p-1 "><button>Return home</button></Link></div>
            
        
      </div>
     
      
    </div>
  )
}

export default Error
