import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useCart } from 'react-use-cart';

const Page = () => {
    const { addItem } = useCart();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unauthenticated, setUnauthenticated] = useState(false); 

    useEffect(() => {
      async function getData() {
        const token = localStorage.getItem('token'); 
        try {
          const response = await axios.get('http://localhost:8000/book/paid', {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          });
          if (response.data.message === 'USER NOT AUTHENTICATED') {
            setUnauthenticated(true); 
          } else {
            setItems(response.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
      getData();
    }, []);

    const handleAddToCart = (product) => {
      addItem(product);
      toast.success("Item added to cart! 🎉,",{
        autoClose:2000
      });
    };

    if (loading) {
      return (
        <div className="flex justify-center mt-[100px] h-screen">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          <p className="ml-2 mt-2 text-lg font-semibold">Loading...</p>
        </div>
      );
    }

    if (unauthenticated) {
      return (
        <div className="flex justify-center h-screen">
          <h1 className="text-red-500 text-2xl font-bold">You are not authenticated to view paid products.</h1>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p.id} className="p-4 hover:scale-105 duration-300 border-gray-300 rounded-lg transition-transform">
            <div>
              <img className="h-[300px] duration-150 w-[300px] border-[3px] border-gray-500 rounded-lg shadow-2xl" src={p.image} alt={p.title} />
            </div>
            <h2 className="font-serif text-teal-800 dark:text-yellow-400 text-2xl">{p.title}</h2>
            <p className="dark:text-green-500  font-serif text-xl">Price: {p.price} Rupees</p>
            <p className="font-serif text-md">Author: {p.author}</p>
            <button
              onClick={() => handleAddToCart(p)}
              className="mt-2 px-4 py-2 bg-violet-500 text-white font-bold rounded-lg hover:bg-violet-600 transition duration-200"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    );
  };

export default Page
