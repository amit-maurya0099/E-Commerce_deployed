import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa6";
import { useSelector } from "react-redux";



const Footer = () => {
  const loading=useSelector((store)=>store.users.loading)
  return (
    <div >
      
      <div className="flex justify-evenly w-full bg-[#3C3C3C] text-white p-8 ">
        <div>
          <h2 className="text-sm text-gray-400 font-semibold">ABOUT</h2>
          <ul className="py-3">
            <li>Contact Us</li>
            <li>About us</li>
            <li>Careers</li>
            <li>Press</li>
            <li> Corporate Information</li>
            <li> ShopKart stories</li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm text-gray-400 font-semibold">HELP</h2>
          <ul className="py-3">
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
            <li>Report Infringement</li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm text-gray-400 font-semibold">CONSUMER POLICY</h2>
          <ul className="py-3">
            <li>Cancellation & Returns</li>
            <li>Terms of Use</li>
            <li> Security</li>
            <li>Privacy</li>
            <li>EPR Compliance</li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm text-gray-400 font-semibold">SOCIAL</h2>
          <ul className="py-3">
            <li className="flex items-center">
              <FaFacebook className="mx-1" />
              Facebook
            </li>
            <li className="flex items-center ">
              <FaInstagram className="mx-1" />
              Instagram
            </li>
            <li className="flex items-center px-1">
              <FaXTwitter />
            </li>
          </ul>
        </div>
        <div >
          <h2 className="text-sm text-gray-400 font-semibold">Registered Office Address </h2>
          <div className="w-[250px] py-3">
            <p>
              Flat No. 5, Golden Heights Apartments, Plot No. 12, Linking Road,
              Bandra West, Mumbai, Maharashtra, 400050, India
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#aba3a3] text-white border-t border-t-white flex justify-center">
      <img
              src="https://bizwiziq.com/wp-content/uploads/2019/02/shopkart-orange-1.png"
              alt="/"
              className="h-12 py-1 "
            ></img>
            <span className="flex items-center px-3">@ shopkart.com</span> 
            <span className="flex items-center "><FaRegCopyright/> copyrights-2024 </span>
      </div>
      
    </div>
          
  );
};

export default Footer;
