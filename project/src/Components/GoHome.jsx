import React from "react";

const GoHome = ( { onClick }) => {
    return (
        <button className="bg-blue-700 font-semibold text-white p-2 rounded-xl mb-6 hover:bg-blue-900" onClick={onClick}>
            Go Home 
        </button>
    );
}

export default GoHome;