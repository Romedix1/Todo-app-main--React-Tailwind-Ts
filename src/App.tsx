import React, { useState, useEffect } from 'react';
import './App.css';

import TopContent from './Components/TopContent';
import MainList from './Components/MainList';

function App() {
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme') as string)  || 'light');

  type ListItems = {
    id: String,
    text: String,
    completed: Boolean,
  }

  const [todoList, setTodoList] = useState<ListItems[]>(JSON.parse(localStorage.getItem('todoList') || '[]'))

  // set localStorage
  useEffect(() => {
      localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])


  return (
    <div className={theme}>
      <TopContent theme={theme} setTheme={setTheme} setTodoList={setTodoList} todoList={todoList}/>
      <MainList todoList={todoList} setTodoList={setTodoList}/>
    </div>
  );
}

export default App;
