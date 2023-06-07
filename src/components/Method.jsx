import "../styles/method.css";
import React from "react";
import { Random } from "./Random";
import { Search } from "./Search";

export const Method = () => {
  return (
    <>
      <div className="method">Let's choose!!</div>
      <Search />
      <Random />
    </>
  );
};
