import React from 'react';
import { useCart } from 'react-use-cart';
import styled, { keyframes } from 'styled-components';
import fadeIn from 'react-animations/lib/fade-in';
import { useNavigate } from 'react-router-dom';

const fadeInRight = keyframes`${fadeIn}`;

const CartSidebar = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 40%;
  height: 100%;
  background-color: #f8fafc; /* Light gray background */
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3); /* Enhanced shadow effect */
  animation: 0.5s ${fadeInRight}; /* Apply fade-in animation */
  padding: 16px;
  overflow-y: auto;

  @media (min-width: 640px) {
    width: 30%; /* Width for medium devices */
}
@media (min-width: 768px) {
    width: 20%; /* Width for large devices */
}
`;

const Cart = () => {
  const navigate = useNavigate();
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
  } = useCart();

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 bg-violet-500 font-bold hover:bg-violet-600 text-white p-3 rounded-full shadow-lg"
      >
        Cart ({totalUniqueItems})
      </button>

      {isSidebarOpen && (
        <CartSidebar className="lg:w-[20%]  dark:text-white dark:bg-slate-900">
          {/* Close Button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-2 right-2 text-red-500 text-2xl lg:text-3xl hover:text-red-700"
          >
            &times;
          </button>
          <h1 className="mt-10 text-xl sm:text-2xl  md:text-3xl font-bold text-violet-500">
            Cart ({totalUniqueItems})
          </h1>
          <ul className="mt-4">
            {items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <li key={item.id} className="mb-4 text-md font-bold">
                  {item.quantity} - {item.title}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="h-6 w-7 items-end text-sm ml-5 bg-slate-900 text-white rounded-full"
                  >
                    &times;
                  </button>
                  <img
                    className=" sm:w-[100px]  w-[80px] h-[80px] sm:h-[100px] my-3 border-[1px] border-black rounded-md"
                    src={item.image}
                    alt={item.title}
                  />
                  <div className="flex space-x-4 mt-2">
                    <button
                      onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) - 1)}
                      className="h-6 w-7 rounded-full bg-red-500"
                    >
                      -
                    </button>
                    <button
                      onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) + 1)}
                      className="h-6 w-7 px-2 rounded-full bg-green-500"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
          {/* Total Price */}
          <div className="mt-6">
            <h2 className="font-bold my-4 text-lg">Total: {cartTotal} Rupees</h2>
          </div>
          <div>
            <button
              onClick={() => {
                toggleSidebar(); // Optionally close the sidebar
                navigate('/checkout');
              }}
              className="   text-sm  sm:text-md hover:bg-red-600 font-bold p-2 w-full bg-red-500 text-center text-white"
            >
              CHECKOUT
            </button>
          </div>
        </CartSidebar>
      )}
    </>
  );
};

export default Cart;
