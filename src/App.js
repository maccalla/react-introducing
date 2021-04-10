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

  //リストとkey
  //リストの変換方法
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map((number) => number * 2);
  console.log(doubled);
  //複数のコンポーネントをレンダーする
  //https://qiita.com/koba04/items/a4d23245d246c53cd49d
  const listItems = numbers.map((number) => (
    <li key={number.toString()}>{number}</li>
  ));

  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => (
      <li key={number.toString()}>{number}</li>
    ));
    return <ul>{listItems}</ul>;
  }

  //Key: どの要素が変更追加削除されたかをReactが識別するのに役立つ
  //key={index}で要素のインデックスも指定できる

  //keyのコンポーネントの抽出
  //正しいkeyの使い方
  function ListItem2(props) {
    // 正解! ここでキーを指定する必要はありません。
    return <li>{props.value}</li>;
  }

  function NumberList2(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => (
      // 正解! キーは配列の中で指定する必要があります。
      <ListItem2 key={number.toString()} value={number} />
    ));
    return <ul>{listItems}</ul>;
  }

  //基本ルールとしては、map() 呼び出しの中に現れる要素に key が必要です

  //key は兄弟要素の中で一意であればよい（グローバルに一意である必要はない）
  function Blog(props) {
    const sideber = (
      <ul>
        {props.posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    );
    function Post(post) {
      return (
        <div>
          <h3>{post.title}</h3>
          <hr />
          <p>{post.id}</p>
          <p>{post.content}</p>
        </div>
      );
    }
    const content = props.posts.map((post) => (
      // keyをコンポーネントに渡したい場合は明示的に書く（props.keyは読み取れない）
      <Post key={post.id} id={post.id} content={post.content} />
    ));
    return (
      <div>
        {sideber}
        {content}
      </div>
    );
  }

  //map()をJSXに組み込む -> JSXでは任意の式を埋め込める
  function ListItem3(props) {
    const numbers = props.numbers;
    // map() の中身がネストされすぎている場合は、コンポーネントに抽出する良いタイミングかもしれない
    return (
      <ul>
        {numbers.map((number) => (
          <ListItem2 key={number.toString()} value={number} />
        ))}
      </ul>
    );
  }

  const posts = [
    { id: 1, title: "hello Mac", content: "Welcome to Mac World!" },
    { id: 2, title: "hello Windows", content: "Welcome to Windows World!" }
  ];

  //フォーム
  //フォーム要素が保持している状態をstateで管理することで2つの状態を結合させる
  //input
  class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: "" };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
      console.log("A name was submitted: " + this.state.value);
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <input type="submit" value="Submit" />
          </label>
        </form>
      );
    }
  }

  //テキストエリア
  class EssayForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: "Please write an essay about your favorite DOM element."
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({ value: event.target.value });
      //console.log(event.target.value);
    }

    handleSubmit(event) {
      console.log("A name was submitted: " + this.state.value);
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Essay:
            <textarea value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </label>
        </form>
      );
    }
  }

  //selectタグ
  class FlavorForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: "cocount" };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({ value: event.target.value });
      //console.log(event.target.value);
    }

    handleSubmit(event) {
      console.log("Your favorite flavor is: " + this.state.value);
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Pick your favorite flavor:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </label>
          <input type="submit" value="submit" />
        </form>
      );
    }
  }

  //file inputタグ
  //非制御コンポーネント

  //例：['foo' + ++i]: i
  //オブジェクト初期化構文は計算されたプロパティ名もサポートします。これにより、式を角かっこで囲む[]ことができ、プロパティ名として計算されて使用されます

  //複数の入力の処理
  class Reservation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isGoing: true,
        numberOfGuests: 2
      };

      this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      console.log([target, ":", value, ":", name]);

      this.setState({
        [name]: value
      });
    }

    render() {
      return (
        <form>
          <label>
            Is Going:
            <input
              name="isGoing"
              type="checkbox"
              checked={this.state.isGoing}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Number of Guest:
            <input
              name="numberOfGuests"
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange}
            />
          </label>
        </form>
      );
    }
  }

  //stateのリフトアップ
  // -> 同一の変化するデータを反映する必要がある場合
  // React での state の共有は、state を、それを必要とするコンポーネントすべての直近の共通祖先コンポーネントに移動することによって実現します。
  // これを “state のリフトアップ (lifting state up)” と呼びます
  function BoilingVerdict(props) {
    if (props.celsius >= 100) {
      return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
  }

  class Calculator extends React.Component {
    constructor(props) {
      super(props);
      //this.handleChange = this.handleChange.bind(this);
      this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
      this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
      this.state = { temperature: "", scale: "" };
    }

    handleCelsiusChange(temperature) {
      this.setState({ scale: "c", temperature });
    }

    handleFahrenheitChange(temperature) {
      this.setState({ scale: "f", temperature });
    }

    render() {
      const scale = this.state.scale;
      const temperature = this.state.temperature;
      const celsius =
        scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
      const fahrenheit =
        scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;
      return (
        <div>
          <TemperatureInput
            scale="c"
            temperature={celsius}
            onTempertureChange={this.handleCelsiusChange}
          />
          <TemperatureInput
            scale="f"
            temperature={fahrenheit}
            onTempertureChange={this.handleFahrenheitChange}
          />
          <BoilingVerdict celsius={parseFloat(celsius)} />
        </div>
      );
    }
  }
  //2つ目の入力を追加する
  const scaleNames = {
    c: "Celsius",
    f: "Fahrenheit"
  };

  class TemperatureInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      //this.state = { temperature: "" };
    }

    handleChange(e) {
      //Before: this.setState({ temperature: e.target.value });
      this.props.onTempertureChange(e.target.value);
    }

    render() {
      //Before: const temperature = this.state.temperature;
      const temperature = this.props.temperature; //後でCalculatorから渡す
      const scale = this.props.scale;
      return (
        <fieldset>
          <legend>Enter temperature in {scaleNames[scale]}:</legend>
          <input value={temperature} onChange={this.handleChange} />
        </fieldset>
      );
    }
  }
  //2つのフィールドを動悸する
  //変換関数の作成
  function toCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }
  function toFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }
  function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return "";
    }
    const output = convert(input); //引数の関数名で関数実行
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }
  //2つの入力フィールドがお互いに同期されるように変更する
  //TemperatureInput -> ローカルのstate削除
  //Calculatorに移動

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
      <ul>{listItems}</ul>
      <NumberList numbers={numbers} />
      <NumberList2 numbers={numbers} />
      <Blog posts={posts} />
      <ListItem3 numbers={numbers} />
      <NameForm />
      <EssayForm />
      <FlavorForm />
      <Reservation />
      {/* stateのリフトアップ */}
      <Calculator />
    </div>
  );
}
