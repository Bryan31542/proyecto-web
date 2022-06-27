import React, { useEffect, useState } from "react";
import CardContainer from "../Components/CardContainer/CardContainer";
import Services from "../Services/Services";
import GoHome from "../Components/GoHome";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [cards, setCards] = useState([]);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const example = async (arrPost) => {
      const filterCards = [];

      for (const post of arrPost) {
        try {
          const res = await Services.getPost(
            localStorage.getItem("token"),
            post
          );
          filterCards.push(res);

          if (filterCards.length === arrPost.length) {
            const onlyFavs = filterCards.filter((card) => card._id);
            setCards(onlyFavs.reverse());
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    Services.getFavPosts(localStorage.getItem("token")).then((res) => {
      example(res.favorites);
    });
  }, [flag, cards]);

  const goToMain = () => {
    navigate("/main");
  };

  return (
    <div>
      <h1 className="text-white font-bold text-3xl text-center mt-12 mb-6">
        Favorite Post
      </h1>
      <div className="flex justify-center items-center">
        <GoHome onClick={goToMain} />
      </div>
      <CardContainer cards={cards} setFlag={setFlag} />
    </div>
  );
};

export default Favorites;
