import React, { useState, useEffect } from "react";

const AddToCart = ({ className, onClick = () => {}, productQt }) => {
    const [quantity, setQuantity] = useState(productQt || 0);

    useEffect(() => {
        setQuantity(productQt);
    }, [productQt]);

    const handleQuantityChange = (method) => {
        setQuantity((prev) => {
            const newQuantity = method === "+" ? prev + 1 : prev - 1;
            return Math.max(newQuantity, 0);
        });
    };

    useEffect(() => {
        if (quantity !== productQt) {
            console.log("Updating cart with quantity:", quantity); // ✅ Debugging log
            onClick(quantity);
        }
    }, [quantity]); // ✅ Only runs when quantity changes

    return (
        <div className={className}>
            {quantity === 0 ? (
                <div
                    className="bg-white border-rose-500 border-[1px] w-36 flex flex-row items-center justify-center h-10 rounded-full gap-2 hover:text-red hover:cursor-pointer"
                    onClick={() => handleQuantityChange("+")}
                >
                    <img src="/svgicons/icon-add-to-cart.svg" alt="Add to Cart"/>
                    <p className="font-bold text-sm">Add to Cart</p>
                </div>
            ) : (
                <div className="bg-red-500 border-rose-500 border-[1px] w-36 flex flex-row items-center justify-around h-10 rounded-full">
                    <button
                        className="rounded-full h-6 w-6 flex items-center justify-center text-white border border-transparent hover:bg-black hover:text-red hover:border-red"
                        onClick={() => handleQuantityChange("-")}
                    >
                        <img src="/svgicons/icon-decrement-quantity.svg" alt="Decrement Quantity"/>
                    </button>
                    <div className="text-white text-lg">{quantity}</div>
                    <button
                        className="rounded-full h-6 w-6 flex items-center justify-center text-white border border-transparent hover:bg-black hover:text-red hover:border-red"
                        onClick={() => handleQuantityChange("+")}
                    >
                        <img src="/svgicons/icon-increment-quantity.svg" alt="Increment Quantity" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddToCart;
