import React, { useState, useEffect } from "react";
import Card from "./Card/Card";
import Services from "../../Services/Services";

const CardContainer = ({ updatePost, cards, setFlag }) => {
  const [fav, setFav] = useState([]);
  const [favFlag, setFavFlag] = useState(false);

  useEffect(() => {
    Services.getFavPosts(localStorage.getItem("token")).then((res) => {
      setFav(res.favorites);
    });
  }, [favFlag, setFavFlag]);

  return (
    <div className="flex flex-col justify-center justify-items-stretch items-center my-1 rounded-sm m-auto">
      {cards.map((card) => (
        <Card
          updatePost={updatePost}
          id={card._id}
          username={card.user.username}
          title={card.title}
          description={card.description}
          image={card.image}
          setFlag={setFlag}
          likes={card.likes}
          active={card.active}
          commentsLength={card.comments.length}
          isFavorite={fav.includes(card._id)}
          setFavFlag={setFavFlag}
        />
      ))}
    </div>
  );
};

export default CardContainer;
