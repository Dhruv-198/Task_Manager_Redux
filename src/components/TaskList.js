import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, moveTask, toggleTaskDone } from '../redux/actions';
import TaskCard from './TaskCard';
import { FaPlus } from 'react-icons/fa';

const TaskList = ({ list }) => {
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      dispatch(addTask(list.id, { 
        title: newTaskTitle, 
        description: newTaskDescription 
      }));
      setNewTaskTitle('');
      setNewTaskDescription('');
      setShowForm(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (data.fromListId !== list.id) {
        dispatch(moveTask(data.fromListId, list.id, data.taskId));
        // Update done status based on destination list
        if (list.id === 'list-3') {
          dispatch(toggleTaskDone(list.id, data.taskId)); // Mark as done for "Done" list
        } else if (list.id === 'list-1' || list.id === 'list-2') {
          dispatch(toggleTaskDone(data.fromListId, data.taskId)); // Mark as not done for "To Do" or "In Progress"
        }
      }
    } catch (err) {
      console.error('Error processing drop:', err);
    }
  };

  return (
    <div 
      className={`task-list ${dragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="task-list-header">
        <h2>{list.title}</h2>
        <span className="task-count">{list.tasks.length}</span>
      </div>
      
      <div className="task-cards">
        {list.tasks.map(task => (
          <TaskCard key={task.id} task={task} listId={list.id} />
        ))}
      </div>
      
      {showForm ? (
        <form className="add-task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            autoFocus
          />
          <textarea
            placeholder="Description (optional)"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <div className="form-actions">
            <button type="submit" className="btn-add">Add</button>
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button 
          className="btn-add-task"
          onClick={() => setShowForm(true)}
        >
          <FaPlus /> Add Task
        </button>
      )}
    </div>
  );
};

export default TaskList;