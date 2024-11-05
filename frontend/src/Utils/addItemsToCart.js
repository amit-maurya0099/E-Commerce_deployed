

export const addItemsToCart=async(id,quantity)=>{
    
try {
    const response=await fetch(`http://localhost:4000/api/v1/product/details/${id}`,{
        method:"GET",
        credentials:"include",
    })
   
    const data=await response.json();
    const product=data.product;
    

    const {_id,name,price,images,stock}=product;
   const Cartproduct={
      "id":_id,
      "name":name,
       "price":price,
       "image":images[0].url,
       "stock":stock,
       "quantity":quantity
   }

   let cartItems= JSON.parse(localStorage.getItem("cartItems"));
   if(!cartItems){
     cartItems=[]
   }
   const itemIndex = cartItems.findIndex(item => item.id === Cartproduct.id);

   if(itemIndex === -1){
       cartItems.push(Cartproduct);
       
   }else{
   
    cartItems[itemIndex]=Cartproduct;
   }

   localStorage.setItem("cartItems",JSON.stringify(cartItems));
   
    
    
} catch (error) {
    console.log(error);
}

}
