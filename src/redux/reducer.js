import { ADD_TASK, EDIT_TASK, DELETE_TASK, MOVE_TASK, TOGGLE_TASK_DONE } from './actions';

// Load from localStorage if available
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('taskboard-state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const savedState = loadState();

// Initial state
const initialState = savedState || {
  lists: [
    {
      id: 'list-1',
      title: 'To Do',
      tasks: [
        { id: 'task-1', title: 'Learn Redux', description: 'Study Redux fundamentals', done: false },
        { id: 'task-2', title: 'Create TaskBoard', description: 'Build a task management app', done: false }
      ]
    },
    {
      id: 'list-2',
      title: 'In Progress',
      tasks: [
        { id: 'task-3', title: 'React Components', description: 'Create reusable components', done: false }
      ]
    },
    {
      id: 'list-3',
      title: 'Done',
      tasks: [
        { id: 'task-4', title: 'Project Setup', description: 'Initialize project and install dependencies', done: true }
      ]
    }
  ]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      const { listId, task } = action.payload;
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id === listId) {
            return {
              ...list,
              tasks: [...list.tasks, { ...task, id: `task-${Date.now()}`, done: false }]
            };
          }
          return list;
        })
      };
    }
    
    case EDIT_TASK: {
      const { listId, taskId, updatedTask } = action.payload;
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id === listId) {
            return {
              ...list,
              tasks: list.tasks.map(task => 
                task.id === taskId ? { ...task, ...updatedTask } : task
              )
            };
          }
          return list;
        })
      };
    }
    
    case DELETE_TASK: {
      const { listId, taskId } = action.payload;
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id === listId) {
            return {
              ...list,
              tasks: list.tasks.filter(task => task.id !== taskId)
            };
          }
          return list;
        })
      };
    }
    
    case MOVE_TASK: {
      const { fromListId, toListId, taskId } = action.payload;
      
      // Find the task to move
      let taskToMove = null;
      
      // Create new state with removed task
      const updatedLists = state.lists.map(list => {
        if (list.id === fromListId) {
          const taskIndex = list.tasks.findIndex(task => task.id === taskId);
          if (taskIndex !== -1) {
            taskToMove = list.tasks[taskIndex];
            return {
              ...list,
              tasks: list.tasks.filter(task => task.id !== taskId)
            };
          }
        }
        return list;
      });
      
      // Add task to the destination list
      if (taskToMove) {
        return {
          ...state,
          lists: updatedLists.map(list => {
            if (list.id === toListId) {
              return {
                ...list,
                tasks: [...list.tasks, taskToMove]
              };
            }
            return list;
          })
        };
      }
      
      return state;
    }
    
    case TOGGLE_TASK_DONE: {
      const { listId, taskId } = action.payload;
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id === listId) {
            return {
              ...list,
              tasks: list.tasks.map(task => 
                task.id === taskId ? { ...task, done: !task.done } : task
              )
            };
          }
          return list;
        })
      };
    }
    
    default:
      return state;
  }
};

export default rootReducer;