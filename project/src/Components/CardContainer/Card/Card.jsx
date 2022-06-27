import React, { useEffect, useState } from "react";
import CardButton from "./CardButton";
import {
  HeartIcon,
  StarIcon,
  PencilIcon,
  EyeOffIcon,
} from "@heroicons/react/solid";
import Services from "../../../Services/Services";
import Modal from "../../Modal/Modal";
import Form from "../../Modal/Form/Form";
import CommentForm from "./CommentForm/CommentForm";
import CommentContainer from "./CommentContainer/CommentContainer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Card = ({
  updatePost,
  id,
  username,
  title,
  description,
  image,
  likes,
  active,
  commentsLength,
  setFlag,
  isFavorite,
  setFavFlag,
}) => {
  const token = localStorage.getItem("token");

  const [myUser, setMyUser] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  Services.verifyToken(token).then((response) => {
    setMyUser(response.username);
  });

  useEffect(() => {
    Services.getPost(localStorage.getItem("token"), id).then((res) => {
      setComments(res.comments);
    });
  }, [id]);

  const onShowComments = async () => {
    try {
      Services.getPost(localStorage.getItem("token"), id).then((res) => {
        setComments(res.comments);
        setFlag((prev) => !prev);
      });
    } catch {
      alert("Error.");
      window.scrollTo(0, 0);
    }
  };

  const printComments = async () => {
    console.log(id);
    setShowComments(true);
    let res = await Services.getPost(localStorage.getItem("token"), id);
    console.log(res.comments);
  };

  const addComent = async (text) => {
    if (text["description"].length >= 8) {
      let res = await Services.addComment(
        localStorage.getItem("token"),
        id,
        text
      );
      console.log(res);
    } else if (text["description"].length > 0) {
        toast.error('Comments must have at least 8 characters', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        
    }
    onShowComments();
    printComments();
  };

  const checkImage = () => {
    if (image === "https://posts-pw2021.herokuapp.com/api/v1/post/create") {
      return;
    } else {
      return (
        <img
          className="w-max pl-6 pr-6 mt-4"
          src={image}
          alt="A visual content that describe the post"
        />
      );
    }
  };

  const checkMyUser = () => {
    if (myUser === username) {
      return (
        <div>
          <Modal
            onClose={() => setShowEdit(false)}
            show={showEdit}
            title="Edit Post"
          >
            <Form
              handlePost={updatePost}
              postID={id}
              onClose={() => {
                setShowEdit(false);
              }}
              type="edit"
            />
          </Modal>

          <div className="flex space-x-16">
            <CardButton onClick={() => setShowEdit(true)}>
              {" "}
              <PencilIcon className="h-7 w-7 hover:text-blue-600" />{" "}
            </CardButton>
            <CardButton onClick={onHidePost}> {checkActive()} </CardButton>
          </div>
        </div>
      );
    }
  };

  const onLikePost = () => {
    Services.likePost(token, id).then((res) => setFlag((prev) => !prev));
  };

  const checkLike = () => {
    if (likes.some((like) => like.username === myUser)) {
      return <HeartIcon className="h-7 w-7 text-red-600 hover:text-red-600" />;
    } else {
      return (
        <HeartIcon className="h-7 w-7 text-gray-600 hover:text-gray-600" />
      );
    }
  };

  const favPost = () => {
    Services.favoritePost(token, id).then((res) => {
      setFavFlag((prev) => !prev);
    });
  };

  const checkFav = () => {
    if (isFavorite) {
      return (
        <StarIcon className="h-7 w-7 text-yellow-600 hover:text-yellow-600" />
      );
    } else {
      return <StarIcon className="h-7 w-7 text-gray-600 hover:text-gray-600" />;
    }
  };

  const onHidePost = () => {
    Services.toggleActive(token, id).then((res) => setFlag((prev) => !prev));
  };

  const checkActive = () => {
    if (!active) {
      return (
        <CardButton onClick={onHidePost}>
          <EyeOffIcon className="h-7 w-7 text-red-600 hover:text-red-600" />
        </CardButton>
      );
    } else {
      return (
        <CardButton onClick={onHidePost}>
          <EyeOffIcon className="h-7 w-7 text-gray-600 hover:text-gray-600" />
        </CardButton>
      );
    }
  };

  return (
      
    <div className="bg-white w-96 h-auto rounded-lg m-0.5 flex flex-col space-x-2 items-center pb-2 ml-6 mb-6">
        
      <div className="flex flex-col justify-center items-center">
        <Modal
          onClose={() => setShowComments(false)}
          show={showComments}
          title="Comments"
        >
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
          <CommentContainer comments={comments} />
        </Modal>

        <h3 className="flex justify-start font-bold text-xl pt-4 pb-2">
          {title}
        </h3>
        <p className="text-md pl-6 pr-4 text-left ">
          {" "}
          <span className="font-semibold text-red-600">@{username}:</span>{" "}
          <span className="break-all">{description}</span>
        </p>
        <div>{checkImage()}</div>
        <div className="flex space-x-16 mt-4 mb-2">
          <CardButton onClick={onLikePost}>
            {checkLike()}
            <span className="px-2 m-auto"> {likes.length} </span>
          </CardButton>

          <CardButton onClick={favPost}>{checkFav()}</CardButton>
          {checkMyUser()}
        </div>

        <CommentForm handleComment={addComent} showComments={printComments} />
        <span className="text-sm text-black font-semibold">
          {" "}
          {commentsLength} comments{" "}
        </span>
      </div>
    </div>
  );
};

export default Card;
