import React, { useState } from "react";
import productsData from "../data.json";
import ProductCard from "../components/ProductCard";
import Carts from "../components/Carts";
import ConfirmationPopUp from "../components/ConfirmationPopUp";

const DessertsPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isPopUpToggled, setIsPopUpToggled] = useState(false);

    const addProduct = (item) => {
        setCartItems(prevItems => {
            const productIndex = prevItems.findIndex(f => f.product.name === item.product.name);
            if (productIndex === -1 && item.Qt > 0) {
                return [...prevItems, item];
            }
            return prevItems.map((i, index) => index === productIndex ? item : i).filter(i => i.Qt > 0);
        });
    };

    const removeItemHandler = (item) => {
        setCartItems(prev => prev.filter(i => i.product.name !== item.product.name));
    };

    const handleConfirmOrder = () => {
        setIsPopUpToggled(true);
    };

    const handleNewOrder = () => {
        setCartItems([]);
        setIsPopUpToggled(false);
    };

    return (
        <div className="container mx-auto px-4 my-16">
            <h1 className="text-3xl font-bold text-center pb-10">Desserts</h1>

            {/* Products Grid */}
            <div className="m-20 justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsData.map((product, index) => (
                    <ProductCard key={product.id || index} product={product} addProduct={addProduct} Items={cartItems} />
                ))}
            </div>

            <div className="mt-12">
                <Carts items={cartItems} removeItemHandler={removeItemHandler} confirmOrder={handleConfirmOrder} />
                {isPopUpToggled && <ConfirmationPopUp newOrder={handleNewOrder} toggleOff={() => setIsPopUpToggled(false)} items={cartItems} />}
            </div>
        </div>
    );
};

export default DessertsPage;
