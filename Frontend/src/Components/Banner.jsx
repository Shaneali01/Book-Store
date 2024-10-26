import React from 'react'
import banner from '../images/banner.png'
import { MdOutlineEmail } from "react-icons/md";


const Banner = () => {
  return (
    <div>
        <div className='flex sm:flex-row flex-col justify-center sm:mx-5'>
            <div className=' w-[90%] lg:w-[700px] md:w-[600px] sm:w-[500px] mt-5 sm:ml-0 ml-8 lg:mt-14 flex flex-col '>
                <h1 className='  text-2xl  sm:text-2xl   md:text-3xl  lg:text-4xl font-bold text-violet-500'>A Room Without Books Is Like A Body Without Soul <span className='text-xl font-bold text-red-500'>— Marcus Tullius Cicero</span></h1>
                <p className=' md:text-xl sm:text-md     lg:text-2xl sm:mt-6 text-md font-serif'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos obcaecati quas itaque omnis illum qui. Earum nemo ut quisquam, veniam quis architecto eius quod possimus ex minima aliquid, voluptatum maiores.</p>
                <div>
                <input type="email" className=' w-[70%] relative  sm:w-[400px] border-gray-400 border-[1px] p-3 rounded-md mt-4'  placeholder='&#9993; Email ' name="" id="" />


                </div>
                <button className='p-2 text-sm ml-2 text-white bg-violet-600 mt-8 w-[80px] rounded-lg'>secondary</button>
            </div>
            <div className= 'sm:w-[400px] w-[300px]'>
                <img src={banner} className='mx-[30px] sm:mx-0' alt="" />

            </div>
        </div>
      
    </div>
  )
}

export default Banner
