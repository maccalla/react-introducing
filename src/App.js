import "./styles.css";

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
    </div>
  );
}
