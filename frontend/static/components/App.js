import React, { useState, useEffect} from "react";

export default function App() {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [auth, setAuth] = useState("Loadings...");

  useEffect(()=> {
    fetch("api/accounts/check/")
      .then( response => response.text())
      .then(text => {
        setAuth(text) 
      })
  }, [])

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <form>
        <p>
          <span>{auth}</span>
          <input
            name="login"
            type="text"
            placeholder="login"
            onChange={(event) => {
              setLogin(event.target.value);
            }}
          />
          {login}
        </p>
        <p>
          <input name="pass" type="text" placeholder="passwort" />
        </p>
        <button>Submit</button>
      </form>
    </div>
  )
}