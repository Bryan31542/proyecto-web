import React from "react";
import { useForm } from "react-hook-form";
import CardButton from "../CardButton";
import { ChatIcon } from "@heroicons/react/solid";

const CommentForm = ({ showComments, handleComment }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data, event) => {
    handleComment(data);
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-x-2 justify-center items-center">
        <input
          name="description"
          type="text"
          placeholder="Add a comment"
          defaultValue=""
          {...register("description", { required: true })}
          className="text-black rounded-md mt-2 mb-2 p-0.5 pl-2 text-lg border-2 border-black w-72"
        />

        <CardButton type="submit" onClick={showComments}>
          <ChatIcon className="h-8 w-8" />
        </CardButton>
      </div>
    </form>
  );
};

export default CommentForm;
