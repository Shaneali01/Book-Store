import React, { useEffect, useState } from "react";
import { CartProvider, useCart } from "react-use-cart";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../Components/Cart";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from "../Page";

const About = () => {
  const navigate = useNavigate();
  const { cartTotal } = useCart();
  console.log(cartTotal);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setTimeout(() => {
        toast.warn("🚫 Login To Access Paid Feature", {
          autoClose: 2000,
        });
      }, 300);
      navigate('/');
    }
  }, [navigate]);

  

  return (
    <div>
      <ToastContainer />

      <div className='flex flex-col justify-center items-center font-serif'>
        <h1 className='text-3xl sm:text-4xl mt-20 mx-4 text-center font-bold text-violet-500'>
          We Are Delighted To Have You <span className='text-red-500'>Here :) </span>
        </h1>
        <p className='text-md sm:text-2xl font-semibold text-center mx-4 mt-5'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur libero vero earum, beatae quae, ab id corporis nobis aliquam maxime perspiciatis voluptatibus nisi amet officiis voluptate aspernatur inventore obcaecati voluptates.
        </p>
        <Link to={'/'}>
          <button className='text-white mt-4 flex bg-violet-500 items-center justify-center font-bold p-2 px-4 rounded-md'>
            Back
          </button>
        </Link>
      </div>
      <div className="relative mt-5">
          <Page />
          <Cart />
      </div>
    </div>
  );
};

export default About;
