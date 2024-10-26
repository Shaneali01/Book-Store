import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Card';
import { useCart } from 'react-use-cart';
import Cart from './Cart';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { BACKEND_URl } from '../utility';

const MyCarousel = () => {
  const { totalUniqueItems } = useCart(); // Access cart data
  const [items,setitems]=useState([]);
  console.log(totalUniqueItems)

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };
  useEffect(()=>{
    async function getdata(){
      const response=await axios.get(`${BACKEND_URl}/book/free`);
      console.log(response.data)
      setitems(response.data)
    }
    getdata()
  },[])
   let freeitems=items.filter((item)=>item.price===0)
   console.log(freeitems)

  return (
    <>
    <ToastContainer/>
    <div className='mt-6'>
      <h1 className='sm:text-4xl text-2xl sm:ml-6 text-violet-500  font-bold mx-3'>Free Available Books</h1>
      <p className=' text-md  sm:ml-6 t  sm:text-2xl mx-3 font-serif my-2 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates et soluta quis ullam! Ullam, sequi, officia consequatur saepe perferendis suscipit enim, ut aspernatur eos porro ducimus facere voluptatem est magnam?</p>
    </div>
    <div>
      <Carousel 
        responsive={responsive} 
        autoPlay={true}  
        autoPlaySpeed={3000}  
        infinite={true}  
        showDots={true}  
        pauseOnHover={true}  
      >
        {freeitems.map((freeitems) => (
          <Card key={freeitems.id} item={freeitems} />
        ))}
      </Carousel>
      <Cart/>
    </div>
    </>
  );
};

export default MyCarousel;
