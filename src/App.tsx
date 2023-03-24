import React, { useState, useEffect } from "react";
import "./App.css";
import UseForm from "./components/UseForm";
import { Todo } from "./models/Todo";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

/**
 * The App component is a React functional component that renders
 * the TaskMania application. It uses the React Hooks API to manage
 * the state of the application. It contains two state variables todoText
 * and an array of todoList and completedTodoList objects.
 */
const App: React.FC = () => {
  /**
   * This statement declares a constant todoText
   * and a function setTodoText using the useState hook.
   */
  const [todoText, setTodoText] = useState<string>("");

  const [todoList, setTodoList] = useState<Todo[]>([]);

  const [completedTodoList, setCompletedTodoList] = useState<Todo[]>([]);

  /**
   *
   * The addTodo() function takes a Todo type as an argument
   * and adds it to the todoList array.
   * @param todo: The Todo type to be added to the todoList array.
   */
  const addTodo = (todo: Todo): void => {
    setTodoList((prevTodos) => [...prevTodos, todo]);
  };

  // console.log("🚀 ~ file: App.tsx:21 ~ todoList:", todoList);

  /**
   * This function is used to handle drag and drop events.
   * It takes in the result of the drag and drop event and logs it to
   * the console. It then checks if the destination is the same as the
   * source and if it is, it returns.
   * If the destination is different, it continues to execute the code.
   * @param result  (DropResult): The result of the drag and drop event.
   * @returns
   */
  const onHandleDragEnd = (result: DropResult) => {
    // console.log("DropResult: ", result);
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let temp;

    if (source.droppableId === "todoList") {
      temp = todoList[source.index];
      // Removes one element from the 'active' array at the specified index.
      todoList.splice(source.index, 1);
    } else {
      temp = completedTodoList[source.index];
      completedTodoList.splice(source.index, 1);
    }
    console.log("🚀 ~ file: App.tsx:79 ~ onHandleDragEnd ~ temp:", temp);

    if (destination.droppableId === "todoList") {
      todoList.splice(destination.index, 0, temp);
    } else {
      completedTodoList.splice(destination.index, 0, temp);
    }

    console.log("🚀 ~ file: App.tsx:78 ~ onHandleDragEnd ~ source:", source);
    console.log(
      "🚀 ~ file: App.tsx:79 ~ onHandleDragEnd ~ destination:",
      destination
    );

    const active = [...todoList];
    const complete = [...completedTodoList];

    setTodoList(active);
    setCompletedTodoList(complete);

    console.log("DropResult: ", result);

    console.log("Active: ", active);
    console.log("complete: ", complete);
  };

  return (
    <DragDropContext onDragEnd={onHandleDragEnd}>
      <div className="App">
        <h1 className="heading">TaskMania</h1>
        <UseForm
          todoText={todoText}
          setTodoText={setTodoText}
          addTodo={addTodo}
        />
        <TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          completedTodoList={completedTodoList}
          setCompletedTodoList={setCompletedTodoList}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
