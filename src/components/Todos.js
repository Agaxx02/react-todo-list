import React, { useContext, useEffect, useState } from 'react'
import { CredentialsContext } from "../App";
import { v4 as uuidv4 } from "uuid";


export const Todos = () => {
    const [todos, setTodos] = useState([])
    const [todoText, setTodoText] = useState('')
    const [credentials] = useContext(CredentialsContext);
    const [filter, setFilter] = useState('uncompleted');

    const persist = (newTodos) => {
        fetch(`http://localhost:4000/todos`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${credentials.username}:${credentials.password}`
            },
            body: JSON.stringify(newTodos)
          })
    }
  useEffect(() => {
    fetch(`http://localhost:4000/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, []);

    const addTodo = (e) => {
        e.preventDefault()
        if(!todoText) return;
        const newTodo = { _id: uuidv4(), checked: false, text: todoText}
        const newTodos = [...todos, newTodo]
        setTodos(newTodos)
        setTodoText('')
        persist(newTodos)
    }
    const toggleTodo = (id) => {
      const newTodoList = [...todos];
      const todoItem = newTodoList.find((todo) => todo.id === id);
      todoItem.checked = !todoItem.checked;
      setTodos(newTodoList);
      persist(newTodoList);
    };
    const getTodos = () => {
      return todos.filter((todo) =>
        filter === "completed" ? todo.checked : !todo.checked
      );
    };
  
    const changeFilter = (newFilter) => {
      setFilter(newFilter);
    };

  return (
    <div>
      <select value={filter} onChange={(e) => changeFilter(e.target.value)}>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
        {getTodos().map((todo) => (
            <div key={todo._id}>
            <input  checked={todo.checked} type='checkbox' onChange={() => toggleTodo(todo._id)} />
            <label>{todo.text}</label>
            </div>

        ))}
        <br/>
        <form onSubmit={addTodo}>
        <input onChange={(e) => setTodoText(e.target.value)} type='text' value={todoText}></input>
        <button type='submit'>Add</button>
        </form>
    </div>
  )
}