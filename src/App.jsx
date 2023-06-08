import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
// import Method from "./components/Method";
import List from "./components/List";

export default function App() {
  const [allMenu, allMenuSet] = useState([]);
  return (
    <div className="App">
      <div className="heading-area">
        <Header />
      </div>
      {/* <Method allMenu={allMenu} allMenuSet={allMenuSet} /> */}
      <List allMenu={allMenu} allMenuSet={allMenuSet} />
    </div>
  );
}
