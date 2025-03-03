import React from "react";

const OrderConfirmButton = ({ onClick }) => {
  return (
    <button 
      className="flex flex-col justify-center items-center bg-red-500 p-4 rounded-full w-full sm:items-center md:items-center"
      onClick={onClick} 
    >
      <p className="text-white">Confirm Order</p>
    </button>
  );
};

export default OrderConfirmButton;
