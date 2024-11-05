import React from 'react'
import useGetQueryProducts from '../Hooks/useGetQueryProducts'
import { useSelector } from 'react-redux';
import ProductCard from '../Utils/ProductCard';
import { useLocation } from 'react-router-dom';
import Loader from '../Utils/Loader';


const QueryProducts =() => {
  useGetQueryProducts();
  const loading=useSelector((store)=>store.users.loading)
  const queryProducts=useSelector((store)=>store.products.allProducts);
  const location=useLocation();
  const useQuery=()=>{
     return new URLSearchParams(location.search);
  }
  const query=useQuery();
  const keyword=query.get("keyword")
   

  if(!queryProducts){
    return;
  }


  
  return (
    <div className='mx-[5%] h-screen'>
      {loading ? <Loader/>:<>
      <h1 className='font-bold text-xl text-center mt-8'>{`Query Products with keyword '${keyword}'`} </h1>
        <div className="flex h-full gap-10 flex-wrap justify-center items-center mt-4 ">
          {queryProducts.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        </>}
    </div>
  )
}

export default QueryProducts
