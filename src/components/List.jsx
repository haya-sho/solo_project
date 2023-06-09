import React, { useState, useEffect } from "react";
import "../styles/list.css";
import randomImage from "../img/random.png";

export const URL =
  process.env.NODE_ENV === "production"
    ? //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
      "https://choose-lunch-app.onrender.com"
    : //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ここのリンクを変更すること■■■■■■■■■■■■■■■■■■■■■■
      "http://localhost:8080";

const List = (props) => {
  const [inputMenu, setInputMenu] = useState(""); // 追加
  const [inputCategory, setInputCategory] = useState(""); // 追加
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
  const menClickAction = () => {
    console.log(URL);
    fetch(`${URL}/table/menIsWaiting`, { method: "PUT" })
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
    if (imageName === null) {
      return require("../img/sample.png");
    } else {
      return require(`../img/${imageName}.png`);
    }
  };

  const updateAPIData = (e) => {
    e.preventDefault();

    // フォームのデータを使ってサーバーにレシピを追加する処理を実装する
    const newRecipe = {
      menu: inputMenu,
      category: inputCategory,
      isWaiting: true,
    };
    console.log(newRecipe);
    fetch(`${URL}/table/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .then((data) => {
        console.log(data); // レシピの追加が成功した場合の処理
        // フォームをリセットする
        setInputMenu("");
        setInputCategory("");
      })
      .catch((error) => {
        console.error(error); // レシピの追加が失敗した場合の処理
      });
  };

  const menuView = () => {
    const elementsArr = [
      <div className="method" key="method">
        Let's choose!!
        <button id="rice" onClick={riceClickAction}>
          ごはん
        </button>
        <button id="men" onClick={menClickAction}>
          麺類
        </button>
        <button id="pasta" onClick={pastaClickAction}>
          パスタ
        </button>
        <button className="all" id="reset" onClick={resetAction}>
          全部
        </button>
        <br></br>
        <label>Random</label>
        <button>
          <img
            src={randomImage}
            alt="random"
            className="transparent-image"
            onClick={randomAction}
          />
        </button>
        <br></br>
        <br></br>
        <br></br>
        <label>✏︎✏︎✏︎add menu✏︎✏︎✏︎</label>
        <input
          placeholder="menu"
          value={inputMenu}
          onChange={(e) => setInputMenu(e.target.value)}
        />
        <input
          placeholder="category"
          value={inputCategory}
          onChange={(e) => setInputCategory(e.target.value)}
        />
        <button type="submit" onClick={updateAPIData}>
          Add
        </button>
      </div>,
    ];
    //allMenuはオブジェクトが入った配列
    props.allMenu.forEach((value) => {
      if (value.isWaiting === true) {
        //imageのリンクをimageSrcに入れる
        const imageSrc = getImageSource(value.image);
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
