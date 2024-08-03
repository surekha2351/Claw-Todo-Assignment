// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    try {
      await axios.post('http://localhost:5000/api/todos', { task });
      fetchTodos();
      setTask('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: true });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <center>
      <div className="App">
        <h1>MERN Todo App</h1>
        <div>
          <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              {todo.task} - {todo.completed ? 'Completed' : 'Incomplete'}
              {!todo.completed && (
                <>
                  <button onClick={() => handleUpdateTodo(todo._id)}>Mark as Completed</button>
                  <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </center>
  );
}

export default App;
