import React from "react";

const Comment = ({ user, description }) => {
  return (
    <div class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100">
      <div class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
        <div class="w-6 flex flex-col items-center">
          <div class="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full ">
            {" "}
          </div>
        </div>
        <div class="w-full items-center flex">
          <div class="mx-2 text-red-600 font-semibold">
            {`${user.username}`}
            <div class="text-xs break-words w-full normal-case font-normal mt-1 text-gray-500 text-left">{`${description}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
