import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import productsData from '../data.json';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showQuantityControls, setShowQuantityControls] = useState({});

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const updateCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);

      if (existingItem) {
        if (quantity <= 0) {
          return prevCart.filter((item) => item.name !== product.name);
        }
        return prevCart.map((item) =>
          item.name === product.name ? { ...item, quantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const handleIncrement = (product) => {
    setShowQuantityControls((prev) => ({ ...prev, [product.name]: true }));
    const existingItem = cart.find((item) => item.name === product.name);
    const newQuantity = (existingItem?.quantity || 0) + 1;
    updateCart(product, newQuantity);
  };

  const handleDecrement = (product) => {
    const existingItem = cart.find((item) => item.name === product.name);
    if (!existingItem) return;

    const newQuantity = existingItem.quantity - 1;
    updateCart(product, newQuantity);
  };

  const handleRemoveFromCart = (productName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== productName));
  };

  return (
    <div className="relative container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Desserts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => {
          const cartItem = cart.find((item) => item.name === product.name);
          return (
            <div key={index} className="border rounded-lg p-4 shadow-lg text-center flex flex-col items-center">
              <img 
                src={product.image.tablet} 
                alt={product.name} 
                className="w-full h-40 object-cover rounded-md"
              />

              {cartItem ? (
                <div className="flex items-center w-full mt-2 border border-red-100 rounded-3xl overflow-hidden bg-red-500">
                  <button 
                    onClick={() => handleDecrement(product)}
                    className="m-1 px-3 py-2 bg-red-500 border rounded-full hover:bg-gray-300"
                  >
                    <FaMinus />
                  </button>

                  <span className="flex-1 text-center text-gray-600 font-semibold">
                    {cartItem.quantity}
                  </span>

                  <button 
                    onClick={() => handleIncrement(product)}
                    className="m-1 px-3 py-2 bg-red-500 border rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    <FaPlus />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => handleIncrement(product)}
                  className="bg-white text-gray-600 text-center px-4 py-2 mt-2 rounded-3xl flex items-center justify-center gap-2 border  border-opacity-5 hover:text-red-500 w-full"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              )}

              <p className="text-gray-500">{product.category}</p>
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="font-bold text-red-500">${product.price.toFixed(2)}</p>
            </div>
          );
        })}
      </div>

      <div 
        className="border p-4 rounded-lg shadow-lg mt-4 bg-white 
        md:absolute md:top-6 md:right-6 md:w-80 lg:w-96"
      >
        <h2 className="text-xl text-red-500 font-bold">Your Cart ({cart.length})</h2>

        {cart.length > 0 ? (
          <ul className="mt-2 space-y-4">
            {cart.map((item) => (
              <li key={item.name} className="flex items-center justify-between border-b pb-2">
                <img 
                  src={item.image.tablet} 
                  alt={item.name} 
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1 ml-3">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                  <p className="text-red-500 font-bold">${item.price.toFixed(2)}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <button 
                  onClick={() => handleRemoveFromCart(item.name)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4">        
            <img src="assets/images/illustration-empty-cart.svg" alt="" className="m-auto w-32"/>
            <p className="text-gray-400 p-5">Your added items will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
