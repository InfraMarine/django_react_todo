import React, { useState, useEffect, useContext} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Cookies from "js-cookie"

import AuthContext from "./AuthContext"
import {Login} from "./Login"
import {Home} from "./Home"

export default function App () {
  
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // read manually made cookie - oversimplified
  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setAuth(true);
    }
  }

  useEffect(() => {
    readCookie();
    setLoading(false);
  },[])

  return (
    <div className="App">
      <AuthContext.Provider value={{auth,setAuth}}>
        <Router>
          {!loading && <Routes/>}
        </Router>
      </AuthContext.Provider>
    </div>
  )
}

const Routes = () => {
  const Auth = useContext(AuthContext);

  return(
    <Switch>
      <ProtectedRoute path="/login"
        term={!Auth.auth}
        elsePath="/home"
        component={Login}
      />
      <ProtectedRoute path="/home"
        term={Auth.auth}
        elsePath="/login"
        component={Home}
      />
      <Route exact path=""
        render = {() => Auth.auth ? <Redirect to="/home"/>
          : <Redirect to="/login"/>
        }
      />
    </Switch>
  )
}

// encapsulates Route to rerender on term change
const ProtectedRoute = ({term, elsePath, component:Component,...rest}) => {
  return (
    <Route {...rest}
      render={() => (term ? <Component/>
        :<Redirect to={elsePath}/>
      )}
    />
  )
}