import React, { useEffect, useState } from "react";
import CardContainer from "../Components/CardContainer/CardContainer";
import MainButton from "../Components/MainButton";
import Services from "../Services/Services";
import GoHome from "../Components/GoHome";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyPost = () => {
  const [flag, setFlag] = useState(false);
  const [myPost, setMyPost] = useState([]);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();

  const updatePost = async (id, post) => {
    try {
      const res = await Services.updatePost(
        localStorage.getItem("token"),
        id,
        post
      );
    } catch {
      toast.error("Error. Something Ocurred", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    Services.getOwned(localStorage.getItem("token"), 0).then((res) => {
      setMyPost(res.data);
    });
  }, [flag]);

  const onNext = async () => {
    try {
      if (counter < myPost.length - 1) {
        const res = await Services.getOwned(
          localStorage.getItem("token"),
          counter + 1
        );
        setMyPost(res.data);
        setCounter(counter + 1);
        window.scrollTo(0, 0);
      } else {
        toast.error("No more posts to load", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.scrollTo(0, 0);
      }
    } catch {
      toast.error("No more posts to load", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.scrollTo(0, 0);
    }
  };

  const onPrevious = async () => {
    try {
      if (counter > 0) {
        const res = await Services.getOwned(
          localStorage.getItem("token"),
          counter - 1
        );
        setMyPost(res.data);
        setCounter(counter - 1);
        window.scrollTo(0, 0);
      } else {
        toast.error("You're at the beginning", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.scrollTo(0, 0);
      }
    } catch {
      alert("Error");
    }
  };

  const goToMain = () => {
    navigate("/main");
  };

  return (
    <div className="flex flex-col items-center justify-center">
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
      <h1 className="text-4xl font-bold text-center text-white my-8">
        My Posts
      </h1>
      <GoHome onClick={goToMain} />
      <CardContainer updatePost={updatePost} cards={myPost} setFlag={setFlag} />
      <div className="space-x-4">
        <MainButton content="Previous Page" onClick={onPrevious} />
        <MainButton content="Next Page" onClick={onNext} />
      </div>
    </div>
  );
};

export default MyPost;
