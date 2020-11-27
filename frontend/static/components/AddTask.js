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
      <Form.Row className="mb-2">
        <Col xs={1}>
          <DatePicker selected={deadline} onChange={handleDatePicker}
            customInput={<DateCustomInput overdued={false}/>}
            showTimeInput
          />
        </Col>
        <Col xs={10} sm={9}>
          <Form.Control
            value={descr}
            onChange={(e)=>setDescr(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control size="sm" as="select" value={priority} onChange={handleSelect}>
            <option value={1}>Low</option>
            <option value={2}>Meh</option>
            <option value={3}>High</option>
            <option value={4}>Critical</option>
          </Form.Control>    
        </Col>
        <Col>
          <Button className="ml-2" type="button" size="md" onClick={handleAdd}>Add</Button>
        </Col>
      </Form.Row>
    </div>
  )
}