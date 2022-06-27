import React, { useState } from "react";
import Services from "../Services/Services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setToken, setType }) => {
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username } = inputValues;
    const { password } = inputValues;

    if (username === "" || password === "") {
      toast.error("Please enter your username and password", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const response = await Services.login(username, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("type", response.role);
      setToken(response.token);
      setType(response.role);

      if (response.error) {
        localStorage.removeItem("token");
        localStorage.removeItem("type");

        toast.error(response.error, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setInputValues({
          username: "",
          password: "",
        });
      }
    }
  };

  return (
    <form className="text-white flex flex-col justify-center items-center h-screen m-auto">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="outline-white flex flex-col justify-center items-center rounded-xl sm:w-1/2 h-80 lg:w-1/3 xl:w-1/4">
        <div className="m-4">
          <label
            htmlFor="username"
            className="block space-y-2 my-3 text-xl font-bold"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="e.g username123"
            className="text-black rounded-md p-0.5 pl-2 text-lg"
            onChange={handleInputChange}
            value={inputValues.username}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block space-y-2 my-3 text-xl font-bold"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            className="text-black border-none rounded-md p-0.5 pl-2 text-lg"
            onChange={handleInputChange}
            value={inputValues.password}
          />
        </div>
        <button
          type="submit"
          className="bg-red-700 text-white font-bold py-2 px-4 rounded-xl w-1/4 mt-6 mb-6 shadow-xl hover:bg-red-900"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
