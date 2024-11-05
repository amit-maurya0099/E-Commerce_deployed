

export const removeItemFromCart=(id)=>{
  let cartItems=JSON.parse(localStorage.getItem('cartItems'));
  const newCartItems=cartItems.filter((item)=>item.id !== id);
  localStorage.setItem('cartItems',JSON.stringify(newCartItems));


}