import React, { useState, useEffect } from 'react';
import NewTask from './NewTask';
import EditTask from './EditTask'
import axios from 'axios';
import './App.scss';

function Tasks() {

  const [tasks, setTask] =  useState([]);
  const [text, setText] = useState('');
  const [edit, setEdit] = useState(-1);

useEffect( () => {
const getElement = async () => {
  await axios.get('http://localhost:8000/allTasks').then(res => {
    setTask(res.data.data)
  })
}
  getElement();
})
  
const onClickButton = async() => {
  await axios.post('http://localhost:8000/createNewTask', {
    text,
    isCheck: false
  }).then(res => {
    const newTasks = [...tasks];
    newTasks.push(res.data.data);
    setTask(newTasks);
    setText('');
  })
  }

const changeCheck = async (index, flag, _id) => {
  await axios.patch('http://localhost:8000/changeTask', {
    isCheck: !flag,
    _id: tasks[index]._id
  }).then(res => {
setTask(res.data.data)
  })
}

const onClickDel = async (index) => {
  await axios.delete(`http://localhost:8000/deleteTask?_id=${tasks[index]._id}`).then(res => {
    setTask(res.data.data)
  })
}

const onClickDone = async (index, valueInput, _id) => {
  await axios.patch('http://localhost:8000/changeTask', {
    text: valueInput,
    isCheck: false,
    _id: tasks[index]._id
  }).then(res => {
  setTask(res.data.data);
  setEdit(-1);
  })
}

  return (
  <div className="App">
    <header className="App-header">
    <h1>To-Doshechka</h1>
      <div className="quest">
        <input type="text" id="add-Task" value={text} onChange={(e) => setText(e.target.value)}/>
        <button className="butt" onClick={() => onClickButton()}>Add</button>
      </div>
      <div className="TaskContainer">
        {tasks.map((task, index) => {

        const newTaskParams = {
          key: `task-${index}`,
          task: task,
          index: index,
          changeCheck: changeCheck,
          onClickEdit: setEdit,
          onClickDel: onClickDel};

        const editTaskParams = {
          key: `task-${index}`,
          task: task,
          index: index,
          onClickDone: onClickDone,
          onClickClose: setEdit};
      
  return index !== edit ?
   (<NewTask {...newTaskParams}/>) : (<EditTask {...editTaskParams}/>);
  })
}
      </div>
    </header>
  </div>
  );
}

export default Tasks;