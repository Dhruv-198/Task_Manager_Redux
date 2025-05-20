import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';

// Logger middleware
const logger = store => next => action => {
  console.group(action.type);
  console.info('Dispatching:', action);
  const result = next(action);
  console.log('Next state:', store.getState());
  console.groupEnd();
  return result;
};

// Save to localStorage middleware
const saveToLocalStorage = store => next => action => {
  const result = next(action);
  try {
    const serializedState = JSON.stringify(store.getState());
    localStorage.setItem('taskboard-state', serializedState);
  } catch (err) {
    console.log('Could not save state to localStorage:', err);
  }
  return result;
};

// Set up Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, saveToLocalStorage))
);

export default store;