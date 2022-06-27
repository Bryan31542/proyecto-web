import React from "react";
import { useForm } from "react-hook-form";
import Services from "../../../Services/Services";
import axios from "axios";
import { useEffect, useState } from "react";

const Form = ({ postID, handlePost, onClose, type }) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    Services.getPost(localStorage.getItem("token"), postID).then((res) => {
      setValues({
        title: res.title,
        description: res.description,
        image: res.image,
      });
    });
  }, [postID]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: { ...values },
  });

  useEffect(() => {
    if (values) {
      setValue("title", values.title);

      setValue("description", values.description);

      setValue("image", values.image);
    }
  }, [values]);

  const onSubmit = (data) => {
    if (type === "create") {
      handlePost(data);
    } else {
      handlePost(postID, data);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <label htmlFor="title" className="font-semibold">
            {"Title"}
          </label>
        </div>

        <div>
          <input
            type="text"
            name="title"
            placeholder="Type your post's title"
            defaultValue=""
            {...register("title", { required: true })}
            className="w-full title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          />
        </div>
      </div>

      {errors.title && <span>This field is required</span>}

      <div>
        <div>
          <label htmlFor="description" className="font-semibold">
            {"Description"}
          </label>
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Write your post's description."
            defaultValue=""
            {...register("description", { required: true })}
            className="w-full description bg-gray-100 sec p-3 h-55 border border-gray-300 outline-none"
          />
        </div>
      </div>

      {errors.description && <span>This field is required</span>}

      <div>
        <div>
          <label htmlFor="image" className="font-semibold">
            {"Image"}
          </label>
        </div>

        <div>
          <input
            type="text"
            name="image"
            placeholder="Paste the URL of your post's image"
            defaultValue=""
            {...register("image", { required: true })}
            className="w-full title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          />
        </div>
      </div>

      {errors.image && <span>This field is required</span>}

      <input
        type="submit"
        className="btn border border-yellow-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-yellow-500"
      />
    </form>
  );
};

export default Form;
