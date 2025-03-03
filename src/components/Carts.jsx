import React from "react";
import RemoveItemButton from "./RemoveItemsButton";
import OrderConfirmButton from "./OrderConfirmButton";

const Carts = ({ items = [], removeItemHandler, confirmOrder = () => {} }) => {
    const totalQt = items.reduce((prev, item) => prev + item.Qt, 0);
    const totalPrice = items.reduce((prev, item) => prev + item.Qt * item.product.price, 0);

    return (
        <div className="relative flex justify-center lg:justify-end lg:absolute lg:right-4 lg:top-4 mt-10 lg:mt-0 ml-auto">
            <div className="bg-gray-100 p-8 rounded-md w-[min(450px,90%)] lg:w-[400px] shadow-sm min-h-80 flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-red-500 py-2">
                    Your Cart ({totalQt})
                </h1>

                {totalQt === 0 && (
                    <div className="flex flex-col justify-center items-center w-full gap-3">
                        <img src={`${import.meta.env.BASE_URL}svgicons/illustration-empty-cart.svg`} alt="Empty Cart" />
                        <p className="text-rose-500 font-semibold">Your added items will appear here</p>
                    </div>
                )}

                {totalQt > 0 && (
                    <div className="flex flex-col h-full gap-6">
                        <ul className="flex flex-col gap-4">
                            {items.map((item, index) =>
                                item.Qt > 0 ? (
                                    <li key={index} className="text-lg border-b border-b-rose-500 border-opacity-10 flex flex-row items-center">
                                        <div className="flex flex-col w-full py-2">
                                            <h1 className="text-lg font-semibold py-2">
                                                {item.product.name}
                                            </h1>
                                            <p>
                                                <span className="text-red-500 font-semibold text-base">{item.Qt}x</span>{" "}
                                                <span className="text-sm text-rose-400">
                                                    @ ${item.product.price.toFixed(2)}
                                                </span>{" "}
                                                <span className="text-sm font-semibold text-rose-500">
                                                    ${(item.Qt * item.product.price).toFixed(2)}
                                                </span>
                                            </p>
                                        </div>
                                        <RemoveItemButton onClick={() => removeItemHandler(item)} />
                                    </li>
                                ) : null
                            )}
                        </ul>
                        <div className="mt-auto pt-6">
                            <div className="flex flex-row w-full justify-between my-4">
                                <p>Order Total</p>
                                <h1 className="text-xl font-bold">${totalPrice.toFixed(2)}</h1>
                            </div>
                            <button className="bg-red-500 p-4 rounded-full w-full text-white" onClick={confirmOrder}>
                                <OrderConfirmButton />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Carts;
