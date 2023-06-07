import "../styles/list.css";
import { React, useState, useEffect } from "react";
// import React, { useState, useEffect, useRef } from "react";

export const List = (props) => {
  const URL =
    process.env.NODE_ENV === "production"
      ? //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        "https://choose-lunch-app.onrender.com"
      : //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ここのリンクを変更すること■■■■■■■■■■■■■■■■■■■■■■
        "http://localhost:8080";

  const [menu, menuSet] = useState([]);

  const getDataFunc = () => {
    fetch(`${URL}/table`, { method: "GET" })
      .then((res) => res.json())
      .then((getData) => {
        menuSet(getData);
      });
  };

  let patchCheck;
  useEffect(() => {
    getDataFunc();
  }, [patchCheck]);

  // const DataSort = () => {
  //   fetch(`${URL}/table`, { method: "GET" })
  //     .then((res) => res.json())
  //     .then((getData) => {
  //       menuSet(getData);
  //     });
  // };
  console.log(process.env);
  return (
    <>
      <div className="list">
        menu lists
        <ul>
          {menu.map((menu) => (
            <li key={menu.id}>{menu.menu}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
