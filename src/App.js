import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import Palette from './components/TodoPalette';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '리액트의 기초 알아보기', checked: true, color: '#212529' },
    {
      id: 2,
      text: '컴포넌트 스타일링 해보기',
      checked: true,
      color: '#212529',
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
      color: '#4c6ef5',
    },
  ]);

  const colors = ['#212529', '#fa5252', '#4c6ef5', '#12b886'];
  const [color, setColor] = useState('#212529');

  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = { id: nextId.current, text, checked: false, color };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [color, todos],
  );

  const onRemove = useCallback(
    id => setTodos(todos.filter(todo => todo.id !== id)),
    [todos],
  );

  const onToggle = useCallback(
    id =>
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      ),
    [todos],
  );

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
