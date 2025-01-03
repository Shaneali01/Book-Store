import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URl } from "./utility";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State for loading
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when starting signup
    try {
      const response = await axios.post(`${BACKEND_URl}/signup`, data);
      if (response.data.message === 'EMAIL ALREADY EXISTS') {
        toast.warning(response.data.message);
      } else {
        toast.success(response.data.message);
        const token = response.data.token;
        console.log(token);
        localStorage.setItem('token', token);
        setTimeout(() => {
          navigate('/');
        }, 750);
      }
    } catch (error) {
      toast.error("Signup failed! Please try again."); // Handle errors
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  const [show, setShow] = useState(true);

  return (
    <>
      <div className="flex justify-center items-center h-[70vh]">
        <ToastContainer />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex border-[1px] bg-white flex-col space-y-5 dark:bg-black w-[70%] sm:w-[60%] md:w-[50%] lg:w-[40%] shadow-2xl p-4 rounded-2xl my-6"
        >
          <h1 className="text-3xl font-bold text-center dark:text-white">
            SIGNUP
          </h1>
          <input
            type="text"
            className="p-2 dark:bg-slate-100 dark:text-black text-md font-bold bg-slate-100 rounded-md"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="text-red-600 text-sm font-bold">This field is required</span>}

          <input
            type="email"
            className="p-2 dark:bg-slate-100 dark:text-black text-md font-bold bg-slate-100 rounded-md"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-600 text-sm font-bold mt-1">This field is required</span>}

          <div className="w-full relative">
            <input
              type={show ? 'password' : 'text'}
              className="bg-slate-100 w-full text-black font-bold text-md p-4 h-7 md:h-10 rounded-lg"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {show ? 
              <IoIosEye onClick={() => setShow(false)} className="absolute dark:text-black text-black bottom-2 right-4"/> 
              : 
              <FaEyeSlash onClick={() => setShow(true)} className="absolute dark:text-black bottom-2 right-4"/>} 
            {errors.password && <span className="text-red-600 text-sm font-bold">This field is required</span>}
          </div>

          <button
            type="submit"
            className={`text-md font-bold text-white p-2 bg-violet-600 hover:bg-violet-700 rounded-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Signing Up..." : "Sign Up"} {/* Show loading text */}
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
