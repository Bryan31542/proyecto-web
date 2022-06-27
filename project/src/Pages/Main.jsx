import React, { useEffect, useState } from "react";
import CardContainer from "../Components/CardContainer/CardContainer";
import Services from "../Services/Services";
import MainButton from "../Components/MainButton";
import Modal from "../Components/Modal/Modal";
import Logout from "../Components/Logout/Logout";
import { Link } from "react-router-dom";
import Form from "../Components/Modal/Form/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  const [flag, setFlag] = useState(false);
  const [cards, setCards] = useState([]);
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("");
  const [user, setUser] = useState("");

  Services.verifyToken(localStorage.getItem("token")).then((res) => {
    setUser(res.username);
  });

  Services.verifyToken(localStorage.getItem("token")).then((response) => {
    setRole(response.role);
  });

  useEffect(() => {
    Services.getPosts(localStorage.getItem("token"), 0).then((res) => {
      setCards(res.data);
    });
  }, [flag]);

  const onNext = async () => {
    try {
      const res = await Services.getPosts(
        localStorage.getItem("token"),
        counter + 1
      );
      setCards(res.data);
      setCounter(counter + 1);
      window.scrollTo(0, 0);
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

  const updatePost = async (id, post) => {
    try {
      const res = await Services.updatePost(
        localStorage.getItem("token"),
        id,
        post
      );
    } catch {
      alert("Error. Something Ocurred");
      window.scrollTo(0, 0);
    }
  };

  const createPost = async (post) => {
    try {
      const res = await Services.createPost(
        localStorage.getItem("token"),
        post
      );
    } catch {
      toast("Error. Something Ocurred");
      window.scrollTo(0, 0);
    }
  };

  const onPrevious = async () => {
    try {
      if (counter > 0) {
        const res = await Services.getPosts(
          localStorage.getItem("token"),
          counter - 1
        );
        setCards(res.data);
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

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    window.location.reload();
  };

  function checkRole() {
    if (role === "admin") {
      return (
        <div className="space-x-4 ml-2">
          <MainButton onClick={() => setShow(true)} content="Create Post" />
          <Link to="/my_post">
            <MainButton content="View my posts" />
          </Link>
        </div>
      );
    }
  }

  return (
    <div>
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
      <div className="flex justify-end mx-6 mt-4">
        <Logout onClick={logout} />
      </div>
      <div className="flex flex-col justify-center items-center ml-2">
        <h2 className="text-white font-black text-3xl">Social Media</h2>
        <h3 className="text-white mt-2 mb-6">
          {" "}
          Welcome, <span className="font-semibold text-blue-300">@{user}</span>
        </h3>
        <div className="space-x-4 flex justify-center items-center">
          {checkRole()}
          <Modal onClose={() => setShow(false)} show={show} title="Make a Post">
            <Form
              handlePost={createPost}
              onClose={() => {
                setShow(false);
              }}
              type={"create"}
            />
          </Modal>

          <Link to="/favorites">
            <MainButton content="View favorites" />
          </Link>
        </div>
      </div>
      <CardContainer updatePost={updatePost} cards={cards} setFlag={setFlag} />
      <div className="flex justify-center items-center space-x-4">
        <MainButton content="Previous Page" onClick={onPrevious} />
        <MainButton content="Next Page" onClick={onNext} />
      </div>
    </div>
  );
};

export default Main;
