import React, { useEffect } from "react";
import "../styles/list.css";
import randomImage from "../img/random.png";

export const URL =
  process.env.NODE_ENV === "production"
    ? //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
      "https://choose-lunch-app.onrender.com"
    : //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ここのリンクを変更すること■■■■■■■■■■■■■■■■■■■■■■
      "http://localhost:8080";

const List = (props) => {
  //この関数を実行すると指定したURLにGETリクエストを送る
  const getDataFunc = async () => {
    fetch(`${URL}/table`, { method: "GET" })
      .then((res) => res.json())
      .then((getData) => {
        props.allMenuSet(getData);
        //allMenuをgetDataとする
        //全てのオブジェクトが入った配列
      });
  };

  // let patchCheck;

  //これを入れないと永遠にループする
  useEffect(() => {
    getDataFunc(props.allMenuSet);
  }, []);
  console.log(props.allMenu);

  const riceClickAction = () => {
    console.log(URL);
    fetch(`${URL}/table/riceIsWaiting`, { method: "PUT" })
      .then((res) => res.json())
      .then(() => {
        getDataFunc(props.allMenuSet);
      });
  };
  const pastaClickAction = () => {
    console.log(URL);
    fetch(`${URL}/table/pastaIsWaiting`, { method: "PUT" })
      .then((res) => res.json())
      .then(() => {
        getDataFunc(props.allMenuSet);
      });
  };
  const resetAction = () => {
    fetch(`${URL}/table/resetIsWaiting`, { method: "PUT" })
      .then((res) => res.json())
      .then(() => {
        getDataFunc(props.allMenuSet);
      });
  };

  const randomAction = () => {
    fetch(`${URL}/table/random`, { method: "PUT" })
      .then((res) => res.json())
      .then(() => {
        getDataFunc(props.allMenuSet);
      });
  };

  //imageのリンクをる
  const getImageSource = (imageName) => {
    return require(`../img/${imageName}.png`);
  };

  const menuView = () => {
    const elementsArr = [
      <div className="method" key="method">
        Let's choose!!
        <button id="rice" onClick={riceClickAction}>
          ごはん
        </button>
        <button id="pasta" onClick={pastaClickAction}>
          パスタ
        </button>
        <button id="reset" onClick={resetAction}>
          全て
        </button>
        <button>
          <img
            src={randomImage}
            alt="random"
            className="transparent-image"
            onClick={randomAction}
          />
        </button>
      </div>,
    ];
    //allMenuはオブジェクトが入った配列
    props.allMenu.forEach((value) => {
      if (value.isWaiting === true) {
        //imageのリンクをimageSrcに入れる
        const imageSrc =
          getImageSource(value.image) !== undefined
            ? getImageSource(value.image)
            : "../img/sample.png";
        elementsArr.push(
          <div className="list" key={value.id}>
            <ul>
              <li>{value.menu}</li>
            </ul>
            <div className="list" key={value.id}>
              <div className="image-container">
                <img src={imageSrc} alt="menu" className="menu-image" />
              </div>
            </div>
          </div>
        );
      }
    });

    return elementsArr;
  };
  const resultElements = menuView();
  return resultElements;
};
export default List;
