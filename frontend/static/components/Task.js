import React, {Component, useState, useEffect} from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import DatePicker from "react-datepicker";
import DateCustomInput from "./DateCustomInput"

export const Task = (props) => {

  const [editing, setEditing] = useState(false)
  const [descr, setDescr] = useState(props.item.descr)
  const [completed, setCompleted] = useState(props.item.completed)
  const [priority, setPriority] = useState(props.item.priority)
  const [deadline, setDeadline] = useState(new Date(props.item.deadline))
  const [overdued, setOverdued] = useState(props.item.overdued)

  useEffect(()=>{
    const now = new Date();
    if (!completed && deadline < now) {
      setOverdued(true)
    }
    else if (completed || deadline > now) {
      setOverdued(false)
    }
    console.log("overdued: " + overdued)
  },[deadline, completed])

  const handleDescrSave = () => {
    props.onUpdate(props.item.id, {'descr':descr})
    setEditing(false)
  }

  const handleCheck = ({target}) => {
    props.onUpdate(props.item.id, {'completed': target.checked})
    setCompleted(target.checked)
  }

  const handleSelect = ({target}) => {
    props.onUpdate(props.item.id, {'priority': target.value})
    setPriority(target.value)
  }

  const handleDatePicker = date => {
    props.onUpdate(props.item.id, {'deadline': date.toISOString()})
    setDeadline(date)
  }

  return (
      <Form inline className="mb-2">
        <DatePicker selected={deadline} onChange={handleDatePicker}
          customInput={<DateCustomInput overdued={overdued}/>}
          showTimeInput
        />
        <Form.Group className="w-75 mx-1">
          <Form.Control className="w-100"
            plaintext={!editing}
            readOnly={!editing}
            value={descr}
            onChange={(e)=>setDescr(e.target.value)}
          />
        </Form.Group>
          <Form.Check type="checkbox" size="lg" checked={completed} onChange={handleCheck}/>
        <Form.Control className="ml-auto mr-2" size="sm" as="select" value={priority} onChange={handleSelect}>
          <option value={1}>Low</option>
          <option value={2}>Meh</option>
          <option value={3}>High</option>
          <option value={4}>Critical</option>
        </Form.Control>
          {editing ? <Button size="sm" type="button" onClick={handleDescrSave}>Save</Button>
            :<Button size="sm" type="button" onClick={()=>setEditing(true)}>Edit</Button>
          }    
          <Button variant="danger" className="ml-2" type="button" size="sm"
            onClick={()=>props.onRemove(props.item.id)}>X</Button>
      </Form>
  )
}