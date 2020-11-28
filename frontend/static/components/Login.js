import React, {useState} from "react"
import Cookies from "js-cookie"

import AuthContext from "./AuthContext"
import {loginAPI} from "../actions/Api.js"
import {Link} from "react-router-dom"

export const Login = () => {
  const Auth = React.useContext(AuthContext)
  const [login, setLogin] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
      e.preventDefault();
      loginAPI({'username':login,'password':pass})
      .then(json => {
        console.log(json);
        if (json.id) {
          Auth.setAuth(true);
          Cookies.set("user", login, { expires: Auth.COOKIE_EXP_IN});
        }
        else {
          setError(JSON.stringify(json));
        }
      })
      .catch((error) => {
        setError('Error:' + error);
      })
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>

      <h3>Login</h3>

      <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control"
            placeholder="Enter username"
            value={login}
            onChange={(e)=> setLogin(e.target.value)}
          />
      </div>

      <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control"
            placeholder="Enter password"
            value={pass} 
            onChange={(e)=> setPass(e.target.value)}
          />
      </div>
      <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
      </form>
      <Link to="/signup">Sign Up</Link>
      {error}
    </div>
  )
}