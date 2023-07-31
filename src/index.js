import ReactDOM from "react-dom";
import { useState } from "react";
import "./style.css"; // Import the CSS file
import React 
import {  } from "react-router-dom";

function App() {
  const [item, setItem] = useState("");
  const [todo, setTodo] = useState([]);
  const [i, setI] = useState(1);
  const [editIndex, setEditIndex] = useState(-1); 
  const [search_val,setSearch_value]= useState(""); // -1 means no item is being edited
  const [duedate,setDuedate]=useState(null);
  const [priority,setPriority]=useState(0);

  function addTodo() {
    if (item.trim() !== "") {
      setTodo([...todo, [item,(Boolean)(false),duedate,priority]]);
      setItem("");
      setI(i + 1);
    }
  }

  function deleteTask(index) {
    const newArray = [...todo];
    newArray.splice(index, 1);
    setTodo(newArray);
    if (index === editIndex) {
      setEditIndex(-1); // Reset the editIndex if the edited item is deleted
    }
  }

  function editTask(index) {
    setEditIndex(index);
    setItem(todo[index][0]);
    setDuedate(todo[index][2]);
    setPriority(todo[index][3]);
  }

  function saveEditedTask(index) {
    const newArray = [...todo];
    newArray[index][0] = item;
    newArray[index][2]=duedate;
    newArray[index][3]=priority;
    setTodo(newArray);
    setEditIndex(-1);
    setItem("");
    setDuedate(null);
    setPriority(0);
  }
  
  function completed(index){
    console.log('completed');
    const array=[...todo];
    array[index][1]=true;
    setTodo(array);
    console.log(todo);
  }

  return (
    <>
      <h1>Add todo</h1>
      <input
        type="text"
        onChange={(e) => {
          setItem(e.target.value);
        }}
        value={item}
      ></input>
      <input type="date" value={duedate} onChange={(e)=> {
        setDuedate(e.target.value);
      }}></input>
      <select onChange={(e)=> { setPriority(e.target.value)}} value={priority}>
        <option value={1} >low</option>
        <option value={2} >medium</option>
        <option value={3} >high</option>
        <option value={0} >select</option>
      </select>
      <button id="submit" onClick={addTodo}>
        submit
      </button>
      <div>
      <input
                    type="text"
                    onChange={(e) => {
                      setSearch_value(e.target.value);
                    }}
      />
      </div>
      <ul className="task-list">
        {todo.map((value, index) => {
          if(value[0].includes(search_val)) 
          {return (
            <li className="task" key={value[0]}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      setItem(e.target.value);
                    }}
                  />
                  <input
                    type="date"
                    value={duedate}
                    onChange={(e) => {
                      setDuedate(e.target.value);
                    }}
                  />
                  <select value={priority} onChange={(e)=> { setPriority(e.target.value)}}>
                    <option value={1} >low</option>
                    <option value={2} >medium</option>
                    <option value={3} >high</option>
                    <option value={0} >select</option>
                  </select>
                  <button onClick={() => saveEditedTask(index)}>Save</button>
                </>
              ) : (
                <>
                  <div className="task-text">
                    <div>{value[0]}</div>
                    <div>{value[2]}</div>
                    <div>{value[3]}</div>
                  </div>
                  <button onClick={() => deleteTask(index)}>delete</button>
                  <button onClick={() => editTask(index)}>edit</button>
                  {(todo[index][1] === true ?(<p>Completed</p>):(<button onClick={() => completed(index)}>completed</button>))}

                    
                </>
              )}
            </li>
          );}
        })}
      </ul>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
