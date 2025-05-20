// Action Types
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const MOVE_TASK = 'MOVE_TASK';
export const TOGGLE_TASK_DONE = 'TOGGLE_TASK_DONE';

// Action Creators
export const addTask = (listId, task) => ({
  type: ADD_TASK,
  payload: { listId, task }
});

export const editTask = (listId, taskId, updatedTask) => ({
  type: EDIT_TASK,
  payload: { listId, taskId, updatedTask }
});

export const deleteTask = (listId, taskId) => ({
  type: DELETE_TASK,
  payload: { listId, taskId }
});

export const moveTask = (fromListId, toListId, taskId) => ({
  type: MOVE_TASK,
  payload: { fromListId, toListId, taskId }
});

export const toggleTaskDone = (listId, taskId) => ({
  type: TOGGLE_TASK_DONE,
  payload: { listId, taskId }
});