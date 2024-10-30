import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa6";
import axios from 'axios'
import { toast ,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from "react-use-cart";
import { BACKEND_URl } from "../utility";

const Navbar = () => {
  const navigate=useNavigate();
  const [show, setshow] = useState(true);
  const [theme, settheme] = useState(true);
  const [token,settoken]=useState(null)
  const [loading,setloading]=useState(false);
  const settingtheme = () => {
    settheme(!theme);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },reset
  } = useForm();
  const onSubmit = async (data) => {
    setloading(true);
    const response=await axios.post(`${BACKEND_URl}/login`,data);
    setloading(false);
    console.log(response.data)
    if(response.data.message==='USER DONT EXIST WITH THIS EMAIL' || response.data.message==='WRONG PASSWORD'){
      return alert(response.data.message)
    }
    settoken(response.data.token);
    localStorage.setItem('token',response.data.token)
    console.log(token);
    toast.success("🎉 Welcome back! You've logged in successfully.",{
      autoClose:1300
    })

    document.getElementById('my_modal_1').close();
    reset()
  };
  const { emptyCart } = useCart();

  function logout(){
    localStorage.removeItem('token')
    settoken(null);
    emptyCart();
    console.log(emptyCart)

    toast.success('👋 Successfully logged out!',{
      autoClose:1300
    })
    navigate('/')
  }
  let element = document.documentElement;
  useEffect(() => {
    if (theme === false) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [theme]);
  const mytoken=localStorage.getItem('token');
  console.log('receiving token',mytoken)
  return (
    <>

      <div className="w-full ">
      <div className="mt-0 shadow-md  sm:top-0   dark:text-white">
        <div className="navbar dark:bg-black  sm:bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className=" p-0 sm:p-2  btn btn-ghost ml-0 lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className=" ml-0 menu menu-sm dropdown-content bg-base-100 dark:bg-black rounded-box z-[1] mt-0 w-52 lg:p-0   p-1 shadow"
              >
                <li>
                  {""}
                  <NavLink to={"/"}>
                    <a>Home</a>
                  </NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to={"/about"}>
                    <a>Paid</a>
                  </NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to={"/contact"}>
                    <a>Contact</a>
                  </NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to={"/course"}>
                    <a>About</a>
                  </NavLink>
                </li>
              </ul>
            </div>
            <a className="font-bold sm:text-2xl md:text-3xl ml-1">
              <span className="text-blue-500 text-xl sm:text-2xl md:text-3xl">
                Verse
              </span>
              <span className="text-red-500 text-xl sm:text-2xl md:text-3xl">
                Voyage
              </span>
            </a>
          </div>
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-0  font-semibold  text-[15px]">
              <li>
                {""}
                <NavLink to={"/"}>
                  <a className="">Home</a>
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to={"/about"}>
                  <a>Paid</a>
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to={"/contact"}>
                  <a>Contact</a>
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to={"/course"}>
                  <a>About</a>
                </NavLink>
              </li>
            </ul>
          </div>
          <label className="input   input-bordered mr-1 sm:mr-0  sm:ml-0  md:flex h-8 ml-5  sm:h-10  w-[25%] sm:w-[400px] md:w-[400px] lg:w-[200px]  items-center gap-1  sm:gap-2">
            <input
              type="text"
              className=" dark:text-black sm:text-[15px]   text-[9px]  text-md font-bold"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="lg:h-4 sm:h-5 h-3 w-3 lg:w-6 sm:w-7 opacity-70 md:ml-[120px] sm:ml-[60px] "
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <CiSearch
            className=" dark:text-black lg:block   block relative sm:hidden  right-6    "
            size={20}
          />
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
            />

            {/* sun icon */}
            <svg
              onClick={settingtheme}
              className="swap-off  w-6  md:h-9 md:w-9 sm:mx-3 ml-0 mr-2  fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              onClick={settingtheme}
              className=" swap-on w-6  md:h-9 md:w-9 sm:mx-3 ml-0 mr-2   fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          <div className=" mx-[2px] sm:mx-[0px] lg:mx-1 mr-0">
           {mytoken? <button onClick={logout} className=" bg-black dark:bg-violet-500  lg:btn lg:text-white lg:bg-black text-white sm:p-[8px] sm:text-md p-[7px] font-semibold text-xs rounded-md">LOGOUT</button>:<a
              onClick={() => document.getElementById("my_modal_1").showModal()}
              className="bg-black dark:bg-violet-500  lg:btn lg:text-white lg:bg-black text-white sm:p-[8px] sm:text-md p-[7px] font-semibold text-xs rounded-md"
            >
              Login
            </a>  }
            <dialog
              id="my_modal_1"
              className="modal  md:ml-40  lg::ml-56 sm:ml-28 ml-16 mr-5 w-[70%]"
            >
              <div className="modal-box dark:bg-slate-950 dark:text-violet-400  ">
                <div>
                  <h1 className="text-center text-3xl dark:text-white font-bold">
                    LOGIN
                  </h1>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    action=""
                    className="flex flex-col dark:text-black space-y-6 my-5"
                  >
                    <input
                      type="text"
                      className="bg-slate-100 text-black font-bold text-md p-4 h-7   md:h-10 rounded-lg"
                      placeholder="E-mail "
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-red-600 text-sm font-bold">
                        This field is required
                      </span>
                    )}

                    <div className="w-full relative">
                      <input
                        type={show ? "password" : "text"}
                        className="bg-slate-100 w-full text-black font-bold text-md p-4 h-7  md:h-10 rounded-lg"
                        placeholder="Password "
                        {...register("password", { required: true })}
                      />
                      {show ? (
                        <IoIosEye
                          onClick={() => setshow(false)}
                          className="absolute bottom-2 right-4"
                        />
                      ) : (
                        <FaEyeSlash
                          onClick={() => setshow(true)}
                          className="absolute bottom-2 right-4"
                        />
                      )}
                      {errors.password && (
                        <span className="text-red-600 text-sm font-bold">
                          This field is required
                        </span>
                      )}
                    </div>

                   {loading ?  <button className="bg-violet-500 text-white font-bold text-md p-2 rounded-xl hover:bg-violet-600">
                      Loggin In ...
                    </button>:  <button className="bg-violet-500 text-white font-bold text-md p-2 rounded-xl hover:bg-violet-600">
                      Login
                    </button>}
                  </form>
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <div className="flex flex-row space-x-1">
                      <p className="font-bold">New User?</p>
                      <button
                        className="underline text-red-700 text-md hover:text-blue-600 font-bold"
                        onClick={() => navigate("/signup")}
                      >
                        {" "}
                        Signup
                      </button>
                    </div>
                  </form>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div></>
  
  );
};

export default Navbar;
