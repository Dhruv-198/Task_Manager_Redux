import React from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard';
import './styles/index.scss';

function App() {
  const lists = useSelector(state => state.lists);

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <TaskBoard lists={lists} />
      </main>
    </div>
  );
}

export default App;