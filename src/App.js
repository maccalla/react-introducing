import "./styles.css";
import React from "react";

export default function App() {
  const name = "john ashe";
  const user = {
    firstName: "kanna",
    lastName: "shinme"
  };

  function formatName(user) {
    return user.firstName + " " + user.lastName;
  }
  function formatDate(date) {
    return date.toLocaleDateString();
  }
  function renderIfCompornent(bool) {
    if (bool) {
      return <div>hello true world!!</div>;
    } else {
      return <div>hello false world!!</div>;
    }
  }
  //関数コンポーネント
  function WelcomeFunc(props) {
    return <h1>Hello, {props.name}</h1>;
  }

  function Avatar(props) {
    return (
      <img className="Avatar" src={props.usr.avatarUrl} alt={props.user.name} />
    );
  }

  function UserInfo(props) {
    return (
      <div className="UserInfo">
        <Avatar user={props.user} />
        <div className="UserInfo-name">{props.user.name}</div>
      </div>
    );
  }

  function Comment(props) {
    return (
      <div className="Comment">
        <UserInfo user={props.author} />
        <div className="Comment-text">{props.text}</div>
        <div className="Comment-date">{formatDate(props.date)}</div>
      </div>
    );
  }

  //propsは読み取り専用
  function sum(a, b) {
    return a + b; //純粋(pure)→純関数
  }
  function withdraw(account, amount) {
    account.total -= amount; //自身への入力を変更するため純関数ではない
  }
  //すべてのReactコンポーネントは自己のpropsに対して純関数のように振るわねばならない

  //Reactのイベント処理
  function ActionLink() {
    function handleClick(e) {
      e.preventDefault();
      console.log("The link was clicked.");
    }

    return (
      <a href="#" onClick={handleClick}>
        Click me
      </a>
    );
  }

  //コンポーネントをES6のクラスとして定義した場合
  class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isToggleOn: true };

      //このバインディングは、コールバックで `this` を動作させるために必要です。
      this.handleClick = this.handleClick.bind(this);

      //this.handleClick へのバインドを忘れて onClick に渡した場合、実際に関数が呼ばれた時に this は undefined となってしまいます。
      //「コールバック」は、簡単に言うと関数の引数に別の関数を指定する処理を指します。
    }

    //イベントハンドラはクラスのメソッドになる
    handleClick() {
      this.setState((state) => ({
        isToggleOn: !state.isToggleOn
      }));
    }

    render() {
      return (
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? "ON" : "OFF"}
        </button>
      );
    }
  }

  //bindの呼び出しを回避する方法
  class LoggingButton extends React.Component {
    // この構文は、`this` が handleClick 内でバインドされることを保証します。
    // 警告: これは*実験的*な構文です。
    //パブリッククラスフィールド構文
    // handleClick = () => {
    //   console.log("this is: ", this);
    // };

    // render() {
    //   return <button onClick={this.handleClick}>Click me</button>;
    // }

    //クラスフィールド構文を使用しない場合
    //コールバック内でアロー関数を使用する
    handleClick() {
      console.log("this is: ", this);
    }

    render() {
      //イベントハンドラーに追加のパラメータを渡すとき
      //<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
      //<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
      return <button onClick={() => this.handleClick()}>Click me</button>;
    }
  }

  //条件付きレンダー
  function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
  }

  function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
  }

  function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />;
    }

    return <GuestGreeting />;
  }

  //要素変数：要素を保持しておくために変数を使うことができる
  function LoginButton(props) {
    return <button onClick={props.onClick}>Login</button>;
  }
  function LogoutButton(props) {
    return <button onClick={props.onClick}>Logout</button>;
  }

  class LoginControl extends React.Component {
    constructor(props) {
      super(props);
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
      this.state = { isLoggedIn: false };
    }

    handleLoginClick() {
      this.setState({ isLoggedIn: true });
    }

    handleLogoutClick() {
      this.setState({ isLoggedIn: false });
    }

    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
      if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;
      } else {
        button = <LoginButton onClick={this.handleLoginClick} />;
      }

      return (
        <div>
          <Greeting isLoggedIn={isLoggedIn} />
          {button}
        </div>
      );
    }
  }

  //論理 && 演算子によるインラインif
  //true && expression
  //false && expression
  function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
      <div>
        <h1>Hello!</h1>
        {unreadMessages.length > 0 && (
          <h2>You have {unreadMessages.length} unread messages.</h2>
        )}
      </div>
    );
  }
  const messages = ["React", "Re:React", "Re:Re:React"];

  //条件演算子によるインライン If-Else
  //condition ? true : false
  function InlineIfElse(props) {
    const isLogginIn = props.isLoggedIn;
    return (
      <div>
        The User id <b>{isLogginIn ? "currently" : "not"}</b> logged in.
      </div>
    );
  }

  function InlineIfElse2(props) {
    const isLoggedIn = props.isLoggedIn;
    return <div>{isLoggedIn ? <p>login true</p> : <p>login false</p>}</div>;
  }

  //コンポーネントのレンダーを防ぐ
  function WarningBanner(props) {
    if (!props.warn) {
      return null;
    }

    return <div className="warning">Warning!!</div>;
  }

  class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = { showWarning: true };
      this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
      this.setState((state) => ({
        showWarning: !state.showWarning
      }));
    }

    render() {
      return (
        <div>
          <WarningBanner warn={this.state.showWarning} />
          <button onClick={this.handleToggleClick}>
            {this.state.showWarning ? "Hide" : "Show"}
          </button>
        </div>
      );
    }
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>{name}</h2>
      <p>{formatName(user)}</p>
      <h2>Start editing to see some magic happen!</h2>
      <div>{renderIfCompornent(true)}</div>
      {/* 関数コンポーネントの組み込み */}
      <WelcomeFunc name="manG" />
      <WelcomeFunc name="manH" />
      {/* コンポーネントの抽出（分割） */}
      <ActionLink />
      <Toggle />
      <LoggingButton />
      <Greeting isLoggedIn={false} />
      <LoginControl />
      <Mailbox unreadMessages={messages} />
      <InlineIfElse isLoggedIn={false} />
      <InlineIfElse2 isLoggedIn={true} />
      <Page />
    </div>
  );
}
