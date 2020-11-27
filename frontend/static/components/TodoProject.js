import React, { useState} from "react";
import {Form, Col, Button, Card} from "react-bootstrap"

import {Task} from "./Task"
import {AddTask} from "./AddTask"
import {createAPI, removeAPI, updateAPI} from "../actions/Api"
 
export const TodoProject = (props) => {

  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(props.item.name)
  const [tasks, setTasks] = useState(props.item.tasks)
  const [bla, setBla] = useState("")

  const handleSave = () => {
    props.onEdit(props.item.id, name)
    setEditing(false)
  }

  // to be passed to AddProject component
  const taskAdd = (data) => {
    createAPI('tasks', {...data, 'project': props.item.id})
    .then(task_json => setTasks([...tasks, task_json]))
    .catch((error) => {
      setBla('Error:' + error)
    })  
  }

  const taskRemove = (id) => {
    removeAPI('tasks', id)
    .then(r => {
      if (r.ok) {
        const newTasks = [...tasks].filter(item => item.id !== id )
        setTasks(newTasks)
      }
    })
    .catch((error) => {
      setBla(error)
    })
  }

  const taskUpdate = (id, data) => {
    updateAPI('tasks', id, data)
    .catch((error) => {
      setBla('Error:' + error)
    })
    const index = tasks.findIndex((item) => item.id === id)
    let newTasks = [...tasks]
    newTasks[index] = {...newTasks[index],...data}
    setTasks(newTasks)
  }

  return (
    <div className="Project">
      <Card>
      <Card.Header>
        <Form.Row className="mb-2">
          <Col xs={12} sm={9}>
            <Form.Control
              plaintext={!editing}
              readOnly={!editing}
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </Col>
          <Col>
            {editing ? <Button type="button" onClick={handleSave}>Save</Button>
              :<Button type="button" onClick={()=>setEditing(true)}>Edit</Button>
            }
            <Button className="ml-2" type="button"
              onClick={()=>props.onRemove(props.item.id)}>Delete
            </Button>
          </Col>
        </Form.Row>

        <AddTask onAdd={taskAdd}/>

      </Card.Header>
      <Card.Body>
        <section>
          {tasks.map((item) =>
          <Task key={item.id} item={item}
            onRemove={taskRemove}
            onUpdate={taskUpdate}/>
          )}
          {bla}
        </section>
      </Card.Body>
      </Card>
    </div>
  )
}