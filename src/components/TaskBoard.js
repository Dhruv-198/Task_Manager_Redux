import React from 'react';
import TaskList from './TaskList';


const TaskBoard = ({ lists }) => {
  return (
    <div className="task-board">
      {lists.map(list => (
        <TaskList key={list.id} list={list} />
      ))}
    </div>
  );
};

export default TaskBoard;