import "./styles/method.css";
import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Method } from "./components/Method";
import { List } from "./components/List";

function App() {
  return (
    <div className="App">
      <div className="heading-area">
        <Header />
      </div>
      <Method />
      <List />
    </div>
  );
}

export default App;
