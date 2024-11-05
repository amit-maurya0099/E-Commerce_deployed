import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';
import { Button } from '@mui/material';
import {toast} from "react-toastify"
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Utils/appSlices/userSlice';
import Loader  from '../../Utils/Loader';
import useProductDetails from '../../Hooks/useProductDetails';


const UpdateProduct = () => {
const params=useParams();
const id=params.id;
useProductDetails(id);
const product= useSelector((store)=>store.products.product)

const navigate=useNavigate();
const dispatch=useDispatch();
const isLoading=useSelector((store)=>store.users.loading);
 
     const [name,setName]=useState();
    const [price,setPrice]=useState();
    const [description,setDescription]=useState();
    const [category,setCategory]=useState();
    const [stock,setStock]=useState()
    const[oldImages,setOldImages]=useState();
    const [images,setImages]=useState([])
    const [imagesPreview,setImagesPreview]=useState([])
    useEffect(() => {
        setName(product.name );
        setPrice(product.price );
        setDescription(product.description );
        setCategory(product.category );
        setStock(product.stock );
        setOldImages(product.images);
        
    }, [product]);
    
    
const categories=["Footwear","Electronics","Home Appliances", "Toys" , "Books", "Furniture", "Travel"]
const updateFormSubmitHandler=async(e)=>{
e.preventDefault();
const myForm=new FormData();
myForm.set("name",name)
myForm.set("price",price)
myForm.set("stock",stock)
myForm.set("category",category)
myForm.set("description",description)

images.forEach((image)=>{
    myForm.append("images",image)
})

try {
    dispatch(setLoading(true))
    const response=await fetch(`https://e-commerce-backend-545f.onrender.com/api/v1/product/update/${id}`,{
        method:"PUT",
        credentials:"include",
        body:myForm
    })
    console.log(response);
    const data=await response.json();
    console.log(data);
    if(response.ok){
        toast.success("Product updated Successfully")
        navigate("/admin/products")
    }else{
        toast.error(data.message);
    }
    dispatch(setLoading(false));
    
} catch (error) {
    dispatch(setLoading(false));
    console.log(error);
    
}

}
const updateProductImageChange=(e)=>{
    const files=Array.from(e.target.files);
    setOldImages([]);
   
    files.forEach((file)=>{
        const reader=new FileReader();
         reader.onload=()=>{
            if(reader.readyState ===2){
                setImagesPreview((old)=>[...old,reader.result])
                setImages((old)=>[...old,reader.result])
            }
        }
        reader.readAsDataURL(file)

    })


}

  return (
    <div className='flex'>
        <Sidebar/>
        <div className='bg-gray-300 h-screen w-full' >
            {isLoading? <Loader/>:<>
          <div className='bg-white m-auto w-[30%] mt-16 py-4'>  
         <h1 className='text-2xl font-semibold text-center '>Update Product</h1>
         <form className=' w-[85%] m-auto  bg-white flex flex-col gap-4 justify-evenly px-4 py-4'onSubmit={updateFormSubmitHandler}>
               <div className='flex items-center border-2 h-12 '>
                <SpellcheckIcon/>
                <input
                   className='text-lg w-full outline-none ml-1'
                   type="text"
                   placeholder='Product Name'
                   value={name}
                   onChange={((e)=>setName(e.target.value))}
                   ></input>
               </div>
               <div className='flex items-center border-2  h-12 '>
                  <AttachMoneyIcon/>
                <input
                   className='text-lg w-full outline-none ml-1'
                   type="text"
                   placeholder='Price'
                   value={price}
                   onChange={((e)=>setPrice(e.target.value))}
                   ></input>
               </div>
               <div className='flex items-center border-2 h-12 '>
                <DescriptionIcon/>
                <textarea
                   className='text-lg w-full  outline-none ml-1'
                   type="text"
                   placeholder='Description'
                   value={description}
                   cols="30"
                   rows="1"
                   onChange={((e)=>setDescription(e.target.value))}
                   ></textarea>
               </div>
               <div className='flex items-center border-2 h-12 '>
                <AccountTreeIcon/>
                <select
                   className='text-lg w-full outline-none ml-1 ' 
                   value={category}
                   onChange={((e)=>setCategory(e.target.value))}>
                    <option >Choose Category</option>
                    {categories.map((cate)=>(
                        <option value={cate} key={cate}>{cate}</option>
                    ))}
                   </select>
               </div>
               <div className='flex items-center border-2 h-12 px-1 '>
                <StorageIcon/>
                <input
                   className='text-lg w-full outline-none ml-1'
                   type="text"
                   placeholder='Stock'
                   required
                   value={stock}
                   onChange={((e)=>setStock(e.target.value))}
                   ></input>
               </div>

               <div className='flex items-center border-2 h-10   '>
                  <input 
                  type="file"
                   name="avatar" 
                   accept='image/*'
                   className='text-lg '
                   multiple
                   onChange={updateProductImageChange}
                   ></input>
      
               </div>
         {  oldImages && oldImages.length!== 0 ? <div className='flex overflow-auto gap-2 w-full no-scrollbar'>
                {oldImages && oldImages.map((img,index)=>(
                    <img key={index} src={img.url} alt="oldimage" className='size-12 '></img>
                ))}
               </div> :
               <div className='flex overflow-auto gap-2 w-full no-scrollbar'>
                {imagesPreview.map((img,index)=>(
                    <img key={index} src={img} alt="avatar preview" className='size-12 '></img>
                ))}
               </div>
               }
               <div className='w-full bg-gray-300 text-white text-center cursor-pointer'><Button type="submit">Update</Button></div>


         </form>
         </div>
         </>}
        </div>
      
    </div>
  )
}

export default UpdateProduct
