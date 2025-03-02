import React, { useEffect, useState } from "react";
import AddToCart from "./AddToCart";

const ProductCard = ({ product, addProduct, Items }) => {
    const productQt = Items.find(i => i.product.name === product.name)?.Qt || 0;
    const [isSelected,setIsSelected] = useState(false);
    useEffect(()=>{
        setIsSelected(productQt > 0);
    },[productQt])
    return (
        <div className="rounded-md w-64 flex flex-col gap-6">
            <div
                className={` h-64 w-full bg-cover bg-center rounded-lg relative shadow-sm ${isSelected? "outline outline-red-500":""}`}
                style={{ backgroundImage: `url(${product.image.desktop})` }}
            >
                <AddToCart
                    className="absolute top-full -translate-y-1/2 left-1/2 -translate-x-1/2"
                    onClick={(qt) => addProduct({ Qt: qt, product })}
                    productQt={productQt}
                />
            </div>
            <div className="flex flex-col">
                <p className="text-rose-400">{product.category}</p>
                <p className="font-bold">{product.name}</p>
                <p className="text-red font-semibold font-sans text-rose-600">
                    ${product.price.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;