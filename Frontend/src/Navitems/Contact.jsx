import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    const userdata = {
      access_key: 'c923b3eb-e737-490e-885b-1cdea6923ff6',
      name: data.name,
      email: data.email,
      message: data.message
    };
    
    try {
      setIsLoading(true); 
      const response = await axios.post('https://api.web3forms.com/submit', userdata);
      toast.success("Successfully sent a message",{
        autoClose:2000
      });
      console.log("RESPONSE", response);
      reset();
    } catch (error) {
      toast.error("SOMETHING WENT WRONG",{
        autoClose:3000
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="flex border-[1px] bg-white flex-col space-y-4 dark:bg-black w-[70%] sm:w-[60%] md:w-[50%] lg:w-[40%] shadow-2xl p-4 rounded-2xl my-6"
        >
          <h1 className="text-3xl font-bold text-center dark:text-white">
            Contact Us
          </h1>
          <label htmlFor="" className="text-md font-bold">Name</label>
          <input
            type="text"
            className=" p-1 text-sm  sm:p-2 dark:bg-slate-100 dark:text-black sm:text-md font-bold bg-slate-100 rounded-md"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="text-red-600 text-sm font-bold">This field is required</span>}

          <label htmlFor="" className="text-md font-bold">Email</label>
          <input
            type="email"
            className=" sm:p-2 text-sm p-1 dark:bg-slate-100 dark:text-black sm:text-md font-bold bg-slate-100 rounded-md"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-600 text-sm font-bold mt-1">This field is required</span>}
          
          <label className="text-sm  sm:text-md font-bold" htmlFor="">Message</label>
          <textarea
            className="h-52 rounded-md p-2 text-md font-bold bg-slate-100 dark:text-black"
            placeholder="Enter your message here"
            {...register("message", { required: true })}
          ></textarea>
          {errors.message && <span className="text-red-600 text-sm font-bold">This field is required</span>}

          <button 
            type="submit" 
            className="text-md font-bold text-white p-2 bg-violet-600 hover:bg-violet-700 rounded-xl"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Contact;
