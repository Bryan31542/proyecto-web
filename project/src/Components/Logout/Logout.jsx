import React from "react";

const Logout = ( { onClick }) => {
    return (
        <button className="bg-green-700 font-semibold text-white p-2 rounded-xl mb-6 hover:bg-green-900" onClick={onClick}>
            Logout 
        </button>
    );
}

export default Logout;