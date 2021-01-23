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
  function renderIfCompornent(bool) {
    if (bool) {
      return <div>hello true world!!</div>;
    } else {
      return <div>hello false world!!</div>;
    }
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>{name}</h2>
      <p>{formatName(user)}</p>
      <h2>Start editing to see some magic happen!</h2>
      <div>{renderIfCompornent(true)}</div>
    </div>
  );
}
