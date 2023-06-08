const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

//knexを使ってdbに接続
const db = require("knex")({
  client: "pg",
  connection: process.env.DATABASE_URL || {
    host: "127.0.0.1",
    user: "user",
    password: "user",
    database: "lunch_menu",
  },
});

const port = process.env.PORT || 8080;

const buildPath = path.join(__dirname, "./build");

app.use(express.static(buildPath));
app.use(express.json());
app.use(cors());

//接続したdbから情報を取る
//JON形式でAllMenuObjを返す
app.get("/table", async (req, res) => {
  console.log("get受信");
  const AllMenu = () => {
    return db.select("*").from("menu_list");
  };
  const AllMenuObj = await AllMenu();
  res.status(200).json(AllMenuObj);
});

//ボタンを押した時に、条件以外のもののテーブルデータを書き換えたい
app.put("/table/riceIsWaiting", async (req, res) => {
  try {
    //一旦全てリセットする処理
    await db("menu_list").update({ isWaiting: true });
    // "ごはん"以外の項目のisWaitingをfalseに書き換える処理
    await db("menu_list")
      .where("category", "!=", "ごはん")
      .update({ isWaiting: false });

    res.status(200).json({ message: "isWaitingがセットされました。" });
  } catch (error) {
    res.status(500).json({ error: "データの更新に失敗しました。" });
  }
});

app.put("/table/pastaIsWaiting", async (req, res) => {
  try {
    //一旦全てリセットする処理
    await db("menu_list").update({ isWaiting: true });
    // "パスタ"以外の項目のisWaitingをfalseに書き換える処理
    await db("menu_list")
      .where("category", "!=", "パスタ")
      .update({ isWaiting: false });

    res.status(200).json({ message: "isWaitingがセットされました。" });
  } catch (error) {
    res.status(500).json({ error: "データの更新に失敗しました。" });
  }
});

app.put("/table/resetIsWaiting", async (req, res) => {
  try {
    // "ごはん"以外の項目のisWaitingをfalseに書き換える処理
    await db("menu_list").update({ isWaiting: true });

    res.status(200).json({ message: "isWaitingがリセットされました。" });
  } catch (error) {
    res.status(500).json({ error: "データの更新に失敗しました。" });
  }
});
app.put("/table/random", async (req, res) => {
  try {
    // 全てのレコードのisWaitingをfalseに書き換える
    await db("menu_list").update({ isWaiting: false });

    // ランダムな1つのレコードを選択する
    const records = await db("menu_list").select("id");
    const randomRecord = records[Math.floor(Math.random() * records.length)];

    if (randomRecord) {
      //ランダムに選ばれたidを選択してその項目のisWaitingのみtrueにする
      await db("menu_list")
        .where({ id: randomRecord.id })
        .update({ isWaiting: true });

      res.status(200).json({ message: "isWaitingがセットされました。" });
    } else {
      res
        .status(404)
        .json({ error: "該当するレコードが見つかりませんでした。" });
    }
  } catch (error) {
    res.status(500).json({ error: "データの更新に失敗しました。" });
  }
});

// app.post("/table", async (req, res) => {
//   console.log("post受信");
//   const patchData = req.body;
//   console.log(patchData.comment);

//   const postFunc = (id, isWaiting, seller, comment) => {
//     return knex("products")
//       .where({ id: id })
//       .update({ isWaiting: isWaiting, seller: seller, comment: comment })
//       .then(() => {
//         console.log("データの更新が完了しました");
//       })
//       .catch((err) => {
//         console.error("データの更新中にエラーが発生しました:", err);
//       });
//   };
//   await postFunc(
//     patchData.id,
//     patchData.isWaiting,
//     patchData.seller,
//     patchData.comment
//   );

//   res
//     .status(200)
//     .json({ message: `ユーザーID ${patchData.id} のデータを更新しました` });
// });

app.listen(port, () => {
  console.log(`Server is online on port: ${port}`);
});
