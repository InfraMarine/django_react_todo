import React, { useState, useEffect} from "react"
import AuthContext from "./AuthContext"
import Cookies from "js-cookie"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import Nav from "react-bootstrap/Nav"


import {TodoProject} from "./TodoProject"
import {AddProject} from "./AddProject"
import {getAllAPI, logoutAPI, createAPI, removeAPI, updateAPI} from "../actions/Api"

export const Home = () => {
  const Auth = React.useContext(AuthContext)
  const [bla, setBla] = useState("")
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getAllAPI('projects')
    .then(json => {
      setProjects(json)
    })
    .catch((error) => {
      setBla('Error:' + error)
    })
    setLoading(false)
  },[])

  const handleLogout = () => {
    logoutAPI()
    Auth.setAuth(false)
    Cookies.remove("user")
  }

  // to be passed to AddProject component
  const projectAdd = (name) => {
    createAPI('projects', {'name':name})
    .then(project_json => setProjects([...projects, project_json]))
    .catch((error) => {
      setBla('Error:' + error)
    })  
  }

  // no other properties can be changed except name
  // to be passed to Project component
  const projectEditName = (id, name) => {
    updateAPI('projects', id, {'name': name})
    .catch((error) => {
      setBla('Error:' + error)
    })
    const index = [...projects].findIndex((item) => item.id === id)
    const newProjects = [...projects]
    newProjects[index].name = name
    setProjects(newProjects)
  }

  /** handle removing project.
   * to be passed to Project component
  */
  const projectRemove = (id) => {
    removeAPI('projects', id)
    .then(r => {
      if (r.ok) {
        const newProjects = [...projects].filter(item => item.id !== id )
        setProjects(newProjects)
      }
    })
    .catch((error) => {
      setBla('Error:' + error)
    })
  }

  return (
    <div className="wrapper">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Task manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Navbar.Text className="mr-4">
              {Cookies.get("user")}
            </Navbar.Text>
            <Nav.Link>
              <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      ------------------------------------------
      {!loading && <section>
        {projects.map((item) =>
        <TodoProject key={item.id} item={item}
          onRemove={projectRemove}
          onEdit={projectEditName}/>
        )}
        {bla}
      </section>}
      <AddProject onAdd={projectAdd}/>
    </div>
  )
}