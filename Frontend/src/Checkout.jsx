import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import tick from './images/tick.png';

const Checkout = () => {
  const navigate = useNavigate();
  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }, [pathname]);
  }

  const { items, cartTotal, emptyCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (cartTotal===0) {
      const token = localStorage.getItem("token");

      if(token){
      setTimeout(() => {
        toast.warn("🚫 Buy At Least One Paid Book", {
          autoClose: 2000,
        });
      }, 300);
      navigate('/about');
    }
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const OrderItems = items.map(item => ({
    name: item.title,
    price: item.price,
    quantity: item.quantity,
  }));

  const onSubmit = async (data) => {

    setLoading(true);
    const orderedItemsString = OrderItems.map(item => 
      `Name: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}`
    ).join('; ');

    const userdata = {
      access_key: 'c923b3eb-e737-490e-885b-1cdea6923ff6',
      name: data.name,
      email: data.email,
      address: data.address,
      postalcode: data.postal_code,
      contact: data.contact,
      ordereditems: orderedItemsString,
      Total_price: cartTotal,
    };


    try {
      console.log(userdata);
      const response = await axios.post('https://api.web3forms.com/submit', userdata, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.message === 'Email sent successfully!') {
        setOrderPlaced(true);
        toast.success("🎉🛒✅ Successfully Placed Order",{
          autoClose:2000
        });
        emptyCart();
      }
      reset();
    } catch (error) {
      toast.error("SOMETHING WENT WRONG");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTimeout(() => {
        toast.warn("Please Login To Checkout", {
          autoClose: 2000,
        });
      }, 300);
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center dark:text-black">
      <ToastContainer />
      {orderPlaced ? (
        <div className="flex flex-row items-center justify-center">
          <img src={tick} className='    w-[15%]     sm:w-[8%] h-[30%]' alt="" />
          <h1 className="text-md sm:text-xl w-[60%] sm:w-[40%]  md:w-[30%]  lg:w-[25%]  md:text-2xl font-bold text-green-500">
            YOUR ORDER HAS BEEN RECEIVED THANK YOU
          </h1>
        </div>
      ) : items.length === 0 ? (
        <div className="md:text-4xl text-xl font-bold text-red-500 text-center">
          <h1>🛒❌ Your cart is empty!</h1>
        </div>
      ) : (
        <div className="bg-white text-xl font-bold p-4 dark:bg-slate-400 rounded-xl text-center w-[70%] flex-col justify-center items-center">
          <h1 className="text-3xl font-serif ">SHIPPING</h1>
          <form className="mt-2 text-md font-normal dark:bg-slate-400 gap-2 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="bg-slate-50 rounded-md dark:bg-slate-200 text-md p-4 h-7 border-[1px] border-gray-400"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name && <span className="text-red-600 text-sm font-bold">This field is required</span>}

            <input
              type="email"
              className="bg-slate-50 rounded-md dark:bg-slate-200 text-md p-4 h-7"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && <span className="text-red-600 text-sm font-bold">This field is required</span>}

            <input
              type="text"
              className="bg-slate-50 rounded-md dark:bg-slate-200 text-md p-4 h-7"
              placeholder="Address"
              {...register("address", { required: true })}
            />
            {errors.address && <span className="text-red-600 text-sm font-bold">This field is required</span>}

            <input
              type="text"
              className="bg-slate-50 rounded-md dark:bg-slate-200 text-md p-4 h-7"
              placeholder="Postal Code"
              {...register("postal_code", { required: true })}
            />
            {errors.postal_code && <span className="text-red-600 text-sm font-bold">This field is required</span>}

            <input
              type="text"
              className="bg-slate-50 rounded-md dark:bg-slate-200 text-md p-4 h-7"
              placeholder="Contact"
              {...register("contact", { required: true })}
            />
            {errors.contact && <span className="text-red-600 text-sm font-bold">This field is required</span>}

            <h1 className="text-3xl my-2 mt-2 font-serif text-teal-600 dark:text-violet-800 ">CART SUMMARY</h1>
            {items.map((item) => (
              <div key={item.id} className="text-md font-serif sm:text-xl font-bold md:text-xl ">
                <h2>{item.name}</h2>
                <div className="flex justify-center items-center">
                  <p>{item.quantity} - {item.title}: Rs {item.price}</p>
                </div>
              </div>
            ))}
            <p className="sm:text-3xl text-md font-serif dark:text-red-700 text-red-500">CART TOTAL : Rs {cartTotal}</p>

            <button
              type="submit"
              className="text-xl p-2 w-full text-white font-semibold hover:bg-violet-700 mt-4 bg-violet-500"
              disabled={loading}
            >
              {loading ? "Processing..." : "PLACE ORDER"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
