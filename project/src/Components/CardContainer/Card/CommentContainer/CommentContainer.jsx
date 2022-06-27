import React from "react";
import Comment from "./Comment/Comment";

const CommentContainer = ({ comments }) => {
  return (
    <div className="flex flex-col items-center rounded-sm my-2 pr-4 max-h-80 overflow-y-auto">
      {comments.map((comment) => (
        <Comment description={comment.description} user={comment.user} />
      ))}
    </div>
  );
};

export default CommentContainer;
