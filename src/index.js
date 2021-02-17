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
//stateとライフサイクル：再利用可能かつカプセル化されたものにする
//内部処理を実装するためにはコンポーネントにstateを追加する必要がある→Class化する
//クラスにライフサイクルメソッドを追加する→マウント、アンマウント
class Clock extends React.Component {
  //秒ごとに更新するという処理は、Clock の内部実装の詳細 (implementation detail) であるべき

  //this.stateの初期状態を設定するクラスコンストラクタを追加する
  constructor(props) {
    super(props); //常に props を引数として親クラスのコンストラクタを呼び出す必要がある
    this.state = { date: new Date() };
  }

  //マウント (mounting)：最初に Clock が DOM として描画されるとき
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  //アンマウント (unmounting):Clock が生成した DOM が削除されるとき
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    //x:this.state = ... o:this.setState()
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

function tick() {
  const element = <Clock />;
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
