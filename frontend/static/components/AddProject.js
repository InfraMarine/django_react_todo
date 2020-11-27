import React, { useState} from "react";

export const AddProject = (props) => {
  const [name, setName] = useState("")
  const [adding,setAdding] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    props.onAdd(name)
    setAdding(false)
  }

  const handleReset= (e) => {
    e.preventDefault()
    setName("")
    setAdding(false)
  }

  return(
    <div className="d-flex justify-content-center">
      {adding ?
      <form>
        <input
          type='text'
          value={name}
          placeholder="Project Name"
          onChange={(e)=>setName(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleReset}>Cancel</button>
      </form>
      : <button onClick={()=>setAdding(true)}>Add</button>
      }
    </div>
  )
}
