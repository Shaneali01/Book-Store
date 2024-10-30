import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from "react-use-cart";
import { BACKEND_URl } from "../utility";

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setshow] = useState(true);
  const [theme, settheme] = useState(true);
  const [token, settoken] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading

  const settingtheme = () => {
    settheme(!theme);
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${BACKEND_URl}/login`, data);
      console.log(response.data);
      if (response.data.message === 'USER DONT EXIST WITH THIS EMAIL' || response.data.message === 'WRONG PASSWORD') {
        return alert(response.data.message);
      }
      settoken(response.data.token);
      localStorage.setItem('token', response.data.token);
      console.log(token);
      toast.success("🎉 Welcome back! You've logged in successfully.", {
        autoClose: 1300
      });
      document.getElementById('my_modal_1').close();
      reset();
    } catch (error) {
      console.error("Login error", error);
      alert("An error occurred while logging in.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const { emptyCart } = useCart();

  function logout() {
    localStorage.removeItem('token');
    settoken(null);
    emptyCart();
    console.log(emptyCart);
    toast.success('👋 Successfully logged out!', {
      autoClose: 1300
    });
    navigate('/');
  }

  let element = document.documentElement;
  useEffect(() => {
    if (theme === false) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [theme]);

  const mytoken = localStorage.getItem('token');
  console.log('receiving token', mytoken);

  return (
    <>
      <div className="w-full ">
        <div className="mt-0 shadow-md sm:top-0 dark:text-white">
          <div className="navbar dark:bg-black sm:bg-base-100">
            {/* Navbar content... */}
            <div className=" mx-[2px] sm:mx-[0px] lg:mx-1 mr-0">
              {mytoken ? (
                <button
                  onClick={logout}
                  className="bg-black dark:bg-violet-500 lg:btn lg:text-white lg:bg-black text-white sm:p-[8px] sm:text-md p-[7px] font-semibold text-xs rounded-md"
                >
                  LOGOUT
                </button>
              ) : (
                <a
                  onClick={() => document.getElementById("my_modal_1").showModal()}
                  className="bg-black dark:bg-violet-500 lg:btn lg:text-white lg:bg-black text-white sm:p-[8px] sm:text-md p-[7px] font-semibold text-xs rounded-md"
                >
                  Login
                </a>
              )}
              <dialog id="my_modal_1" className="modal md:ml-40 lg::ml-56 sm:ml-28 ml-16 mr-5 w-[70%]">
                <div className="modal-box dark:bg-slate-950 dark:text-violet-400">
                  <div>
                    <h1 className="text-center text-3xl dark:text-white font-bold">LOGIN</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {/* Form fields... */}
                      <button type="submit" className="btn" disabled={loading}>
                        {loading ? "Loading..." : "Login"} {/* Loading state */}
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
