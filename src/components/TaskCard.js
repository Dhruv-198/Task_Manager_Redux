import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask, toggleTaskDone, moveTask } from '../redux/actions';
import { FaCheckCircle, FaEdit, FaTrash } from 'react-icons/fa';

const TaskCard = ({ task, listId }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(listId, task.id));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      dispatch(editTask(listId, task.id, {
        title: editedTitle,
        description: editedDescription
      }));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleToggleDone = () => {
    dispatch(toggleTaskDone(listId, task.id));
    // Move to "Done" list (list-3) if marking as done, or back to original list if unmarking
    if (!task.done) {
      dispatch(moveTask(listId, 'list-3', task.id));
    } else if (task.originalListId && task.originalListId !== listId) {
      dispatch(moveTask(listId, task.originalListId, task.id));
    }
  };

  const handleDragStart = (e) => {
    const data = JSON.stringify({
      taskId: task.id,
      fromListId: listId
    });
    e.dataTransfer.setData('text/plain', data);
    e.dataTransfer.effectAllowed = 'move';
  };

  if (isEditing) {
    return (
      <div className="task-card editing">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="edit-title"
          autoFocus
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="edit-description"
          placeholder="Description (optional)"
        />
        <div className="card-actions">
          <button onClick={handleSave} className="btn-save">Save</button>
          <button onClick={handleCancel} className="btn-cancel">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`task-card ${listId === 'list-3' ? 'done' : listId === 'list-2' ? 'in-progress' : 'to-do'}`}
      draggable
      onDragStart={handleDragStart}
    >
      <div className="card-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-actions">
          <button onClick={handleToggleDone} className="btn-done">
            <FaCheckCircle />
          </button>
          <button onClick={handleEdit} className="btn-edit">
            <FaEdit />
          </button>
          <button onClick={handleDelete} className="btn-delete">
            <FaTrash />
          </button>
        </div>
      </div>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
    </div>
  );
};

export default TaskCard;