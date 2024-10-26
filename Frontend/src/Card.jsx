import React from 'react'
import banner from './images/banner.png'
import { useCart } from 'react-use-cart';
import { toast ,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Card = ({item}) => {
  const { addItem } = useCart();
  function idtaking(id){
    console.log(id)
  }
  function AddingItem(item){
    addItem(item);
    toast.success("Item added to cart! 🎉",{
      autoClose:2000
    })
  }

  console.log(item.image)
  return (
    <>
    <div onClick={()=>idtaking(item.id)} className='my-10 ml-5  dark:bg-slate-950 dark:text-white '>
        <div className="card bg-base-100 w-[80%] shadow-xl">
  <figure>
    <img className='sm:h-[250px] sm:w-[500px] h-[200px] w-[100%]'
      src={item.image}
      alt="Shoes" />
  </figure>
  <div className="card-body bg-slate-300 space-y-0 rounded-lg dark:bg-slate-600 p-3">
    <h1 className="card-title font-serif">
      {item.title}
      <div className="badge badge-outline">{item.category}</div>
    </h1>
    <p  className='text-md font-semibold  my-3'><span className=' badge-none text-sm font-bold'>Author: </span>{item.author}</p>
    <div className="card-actions flex justify-between">
      <div className="">
        <button onClick={()=>AddingItem(item)} className='btn btn-sm text-white bg-violet-500'>ADD TO CART</button>
      </div>
    </div>
  </div>
</div>
      
    </div></>
    
  )
}

export default Card
