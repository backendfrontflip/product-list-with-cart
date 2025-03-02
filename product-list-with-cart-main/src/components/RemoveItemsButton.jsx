import React from 'react';

const RemoveItemButton = ({ onClick }) => {
  return (
    <button
      className="h-6 w-6 bg-white border border-gray-500 text-gray-500 rounded-full flex justify-center items-center hover:text-red hover:border-red"
      onClick={onClick}
    >
      <img src="/svgicons/icon-remove-item.svg" alt="Remove Item" />
    </button>
  );
};

export default RemoveItemButton;
