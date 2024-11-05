import React from 'react'
import spinner from"./loader.gif";

const Loader = () => {
  return (
    <div className='flex justify-center'>
      <img src={spinner} alt="/"></img>
    </div>
  )
}

export default Loader;
