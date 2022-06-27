import React from "react";

const CardButton = ({ children, onClick }) => {
    return (
        <button className="flex font-bold text-black rounded-full shadow-xl m-auto" onClick={onClick}>
            {children}
        </button>
    );
};

export default CardButton;