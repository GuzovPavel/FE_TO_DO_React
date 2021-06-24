import React from 'react';
import edit from './images/edit.png'
import del from './images/del.png';


function NewTask ({task, index, onClickEdit, onClickDel, changeCheck}) {

if (!task.isCheck) {
  return (
  <div className='TaskBox'>
  <input className="Check" type='checkbox' checked={task.isCheck} onChange={() => changeCheck(index, task.isCheck)}/>
    <span className="task-text">{task.text}</span>
    <img src={edit} alt="edit" onClick={() => onClickEdit(index)} />
    <img src={del} alt="del" onClick={() => onClickDel(index)} />
</div>)
} else {
  return (
    <div className='TaskBox'>
    <input className="Check" type='checkbox' checked={task.isCheck} onChange={() => changeCheck(index, task.isCheck)}/>
      <span className="task-text-update">{task.text}</span>
      <img src={del} alt="del" onClick={() => onClickDel(index)} />
</div>
)
}
}

export default NewTask;