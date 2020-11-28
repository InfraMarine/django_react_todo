import React, {useState, useEffect} from "react";
import {Form, Col, Button} from "react-bootstrap"
import DatePicker from "react-datepicker";
import DateCustomInput from "./DateCustomInput"

export const AddTask = (props) => {

  const [descr, setDescr] = useState("")
  const [priority, setPriority] = useState(2)
  const [deadline, setDeadline] = useState(new Date())

  const handleAdd = () => {
    if (descr) {
      props.onAdd({'descr':descr, 'deadline': deadline.toISOString(), 'priority':priority})
      setDescr("")
    }
  }

  const handleSelect = ({target}) => {
    setPriority(target.value)
  }

  const handleDatePicker = date => {
    setDeadline(date)
  }

  return (
    <div className="TaskAdd">
      <Form inline className="mb-2">
        <DatePicker selected={deadline} onChange={handleDatePicker}
          customInput={<DateCustomInput overdued={false}/>}
          showTimeInput
        />
        <Form.Group className="w-75 mx-2">
          <Form.Control className="w-100"
            value={descr}
            onChange={(e)=>setDescr(e.target.value)}
          />
        </Form.Group>
        <Form.Control size="sm" as="select" value={priority} onChange={handleSelect}>
          <option value={1}>Low</option>
          <option value={2}>Meh</option>
          <option value={3}>High</option>
          <option value={4}>Critical</option>
        </Form.Control>    
        <Button className="ml-auto" type="button" size="md" onClick={handleAdd}>Add</Button>
      </Form>
    </div>
  )
}