import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PublicIcon from '@mui/icons-material/Public';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import {Country, State} from "country-state-city"
import MetaData from "../Utils/MetaData";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "./CheckOutSteps";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../Utils/appSlices/cartSlice";
const ShippingPage = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const shippingInfo=useSelector((store)=>store.cart.shippingInfo)
    const [address,setAddress]=useState(shippingInfo.address);
   const [state,setState]=useState(shippingInfo.state);
   const [city,setCity]=useState(shippingInfo.city);
   const [country,setCountry]=useState(shippingInfo.country);
   const [pinCode,setPinCode]=useState(shippingInfo.pinCode);
   const [phoneNumber,setphoneNumber]=useState(shippingInfo.phoneNumber);

const shippingSubmit=(e)=>{
     e.preventDefault();
   if(phoneNumber.length>10 || phoneNumber.length<10){
    toast.error("phone number must be of 10 digit")
    return;
   }
   dispatch(saveShippingInfo({address,state,city,country,pinCode,phoneNumber}));
    navigate("/order/confirm")
}

  return (
  <>
    <MetaData title="shipping-detail" ></MetaData>
    <CheckOutSteps activeStep={0} />
    <div className=" h-full flex justify-center ">
      <div className="  w-[25%]  m-4 pb-8">
        <div className="text-center font-semibold text-2xl border-b-2 border-gray-400 mx-16 pb-4 ">
          Shipping Details
        </div>
        <form className="mt-4 flex flex-col gap-4 text-md font-md" onSubmit={shippingSubmit}>
        <div className="flex  items-center h-[3rem] bg-white px-1 border mx-4  ">
          <HomeIcon />
          <input
            type="text"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            placeholder="Address"
            className=" w-full outline-none h-full px-1"   
          ></input>
        </div>
        <div className="flex  items-center h-[3rem] bg-white px-1 border mx-4   ">
          <LocationCityIcon />
          <input
            type="text"
            value={city} 
            onChange={(e)=>setCity(e.target.value)}
            placeholder="City"
            className=" w-full outline-none h-full px-1"   
          ></input>
        </div>
        <div className="flex  items-center h-[3rem] bg-white px-1 border mx-4   ">
          < PinDropIcon/>
          <input
            type="text"
            value={pinCode}
            onChange={(e)=>setPinCode(e.target.value)}
            placeholder="Pin Code"
            className=" w-full outline-none h-full px-1"   
          ></input>
        </div>
        <div className="flex  items-center h-[3rem] bg-white px-1 border mx-4   ">
          <PhoneInTalkIcon />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e)=>setphoneNumber(e.target.value)}
            placeholder="Phone Number"
            className=" w-full outline-none h-full px-1"   
          ></input>
        </div>
        <div className="flex  items-center h-[3rem] bg-white px-1 border mx-4   ">
          <PublicIcon />
          <select 
            required
            className="text-lg w-full outline-none"
            value={country}
            onChange={(e)=>setCountry(e.target.value)}>
               <option value="">Country</option>
               {Country &&
                 Country.getAllCountries().map((item)=>(
                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                 ))
               }
               </select>
        </div>
        {country && (
        <div className="flex  items-center h-[3rem] bg-white px-1 border mx-4    ">
          <TransferWithinAStationIcon/> 
          <select
           required
           value={state}
           className="w-full text-lg outline-none"
           onChange={(e)=>setState(e.target.value)}
          >
             <option value="">State</option>
             {State && 
                State.getStatesOfCountry(country).map((item)=>(
                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                ))
             }
          </select>
          
        </div>
        )}
        <div className="flex  items-center h-[3rem] bg-white border mx-4 my-4 ">   
          <button
          type="submit"
          value="Continue"
           className={`w-full text-lg outline-none h-full px-1 text-center  ${state ? 'bg-orange-600':'bg-orange-300'} text-white` } 
            disabled={state? false:true }
          >Continue</button>
          
        </div>

     
     



        </form>
      </div>
    </div>
  </>
  );
};

export default ShippingPage;
