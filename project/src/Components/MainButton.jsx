import React from "react";

const MainButton = ( {content, onClick }) => {
    return (
        <button className="bg-red-700 font-semibold text-white p-2 rounded-xl mb-6 hover:bg-red-900" onClick={onClick}>
            {content}
        </button>
    );
}
    
export default MainButton;