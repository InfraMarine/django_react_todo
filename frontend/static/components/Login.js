import React, { useState, useEffect} from "react"
import Cookies from "js-cookie"

import AuthContext from "./AuthContext"
import {loginAPI} from "../actions/Api.js"

const COOKIE_EXP_IN = 7;

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
        Auth.setAuth(true);
        Cookies.set("user", login, { expires: COOKIE_EXP_IN });
      })
      .catch((error) => {
        setError('Error:' + error);
      })
  }

  return (
      <div>
          <h1>Welcome to the rice fields...</h1>

          <form onSubmit={handleSubmit}>
            <input id='login' type='text'
              placeholder="username"
              value={login}
              onChange={(e)=> setLogin(e.target.value)
            }/>
            <input id='pass' type='password'
              placeholder="password"
              value={pass} 
              onChange={(e)=> setPass(e.target.value)
            }/>
            <button>Login</button>
            <span>{error}</span>
          </form>
      </div>
  )
}