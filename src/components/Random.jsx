import "../styles/method.css";
import React from "react";
import randomImage from "../img/random.png";

export const Random = () => {
  const myfunction = () => {
    console.log("CLICKED");
  };
  return (
    <>
      <button>
        <img src={randomImage} alt="random" onClick={myfunction} />
      </button>
    </>
  );
};
