import React from 'react';
import done from './images/done.png';
import close from './images/close.png';
import { useState } from 'react';

const EditTask = ({task, index, onClickClose, onClickDone}) => {
  const [valueInput, setInput] = useState(task.text);

  return(
    <div className="edit-task">
      <input className="newVal" type="text" value={valueInput} onChange={(e) => setInput(e.target.value)}/>
      <img src={done} alt="done" onClick={() => onClickDone(index, valueInput)}/>
      <img src={close} alt="close" onClick={() => onClickClose(-1)}/>
    </div>
  )
}

export default EditTask;