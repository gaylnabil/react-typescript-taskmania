import React, { useState } from "react";
import "./App.css";
import UseForm from "./components/UseForm";
import { Todo } from "./models/Todo";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const [todoText, setTodoText] = useState<string>("");

  const [todoList, setTodoList] = useState<Todo[]>([]);

  const addTodo = (todo: Todo): void => {
    setTodoList((prevTodos) => [...prevTodos, todo]);
  };

  console.log("🚀 ~ file: App.tsx:21 ~ todoList:", todoList);

  return (
    <div className="App">
      <h1 className="heading">TaskMania</h1>
      <UseForm
        todoText={todoText}
        setTodoText={setTodoText}
        addTodo={addTodo}
      />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
};

export default App;
