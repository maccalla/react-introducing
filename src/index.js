import { StrictMode } from "react";
import ReactDOM from "react-dom";
import React from "react";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

//秒刻みで動く時計
function tick() {
  const element = (
    <div>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById("tick"));
}

setInterval(tick, 1000);

//下記2つは等価
//関数コンポーネント
// function WelcomeFunc(props) {
//   return <h1>Hello, {props.name}</h1>;
// }
//クラスコンポーネント
class WelcomeClass extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

//JSXにかかれている属性と子要素を単一のオブジェクトとしてこのコンポーネントに渡す
function renderComponent() {
  const element = <WelcomeClass name="Sara" />;
  ReactDOM.render(element, document.getElementById("component"));
}

renderComponent();
