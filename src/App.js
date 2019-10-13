import React, { useState, useReducer, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import Palette from './components/TodoPalette';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({ id: i, text: `할 일 ${i}`, checked: false, color: '#212529' });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': // 새로 추가, {type: 'INSERT', todo: {id: 1, text: 'todo', checked: false}}
      return todos.concat(action.todo);
    case 'REMOVE': // 제거, {type: 'REMOVE', id: 1}
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE': // 토글, {type: 'TOGGLE', id: 1}
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const colors = ['#212529', '#fa5252', '#4c6ef5', '#12b886'];
  const [color, setColor] = useState('#212529');

  const nextId = useRef(2501);

  const onInsert = useCallback(
    text => {
      const todo = { id: nextId.current, text, checked: false, color };
      dispatch({ type: 'INSERT', todo });
      nextId.current += 1;
    },
    [color],
  );

  const onRemove = useCallback(id => dispatch({ type: 'REMOVE', id }), []);

  const onToggle = useCallback(id => dispatch({ type: 'TOGGLE', id }), []);

  const onChangeColor = useCallback(color => setColor(color), []);

  return (
    <TodoTemplate>
      <Palette setColor={color} colors={colors} onClick={onChangeColor} />
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
