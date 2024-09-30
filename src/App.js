import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, fetchTodos } from './redux/todoSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch();
  const { todos, status, error } = useSelector((state) => state.todos);

  // Fetch todos when the component mounts
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (todoText.trim()) {
      dispatch(addTodo(todoText));
      setTodoText('');
    }
  };

  return (
    <div className="App container mt-5">
      <h1 className="text-center mb-4">Todo List</h1>

      {/* Input for Todo */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Enter Todo"
        />
        <button className="btn btn-primary" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>

      {/* Status Messages */}
      {status === 'loading' && (
        <div className="alert alert-info" role="alert">
          Loading...
        </div>
      )}
      {status === 'failed' && (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      )}

      {/* Todo List */}
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            {todo.text}
            <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
