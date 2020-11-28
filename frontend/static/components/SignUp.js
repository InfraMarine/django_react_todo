import React, {useState} from "react"
import Cookies from "js-cookie"

import AuthContext from "./AuthContext"
import {loginAPI, registerAPI} from "../actions/Api.js"
import {Link, useHistory} from "react-router-dom"

export const SignUp = () => {
  const history = useHistory();
  const Auth = React.useContext(AuthContext)
  const [login, setLogin] = useState("")
  const [pass1, setPass1] = useState("")
  const [pass2, setPass2] = useState("")
  const [error, setError] = useState("")
  const [matching, setMatching] = useState(true)

  const handleSubmit = (e) => {
      e.preventDefault();
      if (pass1 && matching && login) {
        registerAPI({'username':login,'password':pass1})
        .then(json => {
          console.log(json);
          if (json.id) {
            loginAPI({'username':login,'password':pass1})
            .then(do_not_care => {
              Auth.setAuth(true);
              Cookies.set("user", login, { expires: Auth.COOKIE_EXP_IN});
            })
          }
          else {
            throw new Error(JSON.stringify(json));
          }
        })
        .catch((error) => {
          setError('Error:' + error);
        })
      }
      
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>

      <h3>Register</h3>

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
            value={pass1} 
            onChange={(e)=> setPass1(e.target.value)}
          />
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input type="password" className="form-control"
          placeholder="Enter password"
          value={pass2} 
          onChange={(e)=> {
            setPass2(e.target.value)
            setMatching(pass1 === e.target.value)
          }}
        />
        {!matching && <div>
          <small id="passwordHelp" className="text-danger">
            Passwords are not the same.
          </small>      
        </div>}
      </div>

      <button type="submit" disabled={!matching} className="btn btn-dark btn-lg btn-block">Sign up</button>
      </form>
      {error}
      <Link to="/login">Sign In</Link>
    </div>
  )
}