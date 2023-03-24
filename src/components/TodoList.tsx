import React, { FC, Dispatch, SetStateAction } from "react";
import { Todo } from "./../models/Todo";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

/**
 * The
 * IProps
 * interface is used to define interface properties for a
 * React component.
 * @date 3/24/2023 - 12:13:04 PM
 *
 * @interface IProps
 * @typedef {IProps}
 */
interface IProps {
  todoList: Todo[];
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
  completedTodoList: Todo[];
  setCompletedTodoList: Dispatch<SetStateAction<Todo[]>>;
}

/**
 * A functional component that renders a todo list with active
 * and completed tasks.
 * @date 3/24/2023 - 12:14:50 PM
 * @returns {*}
 */
const TodoList: FC<IProps> = ({
  todoList,
  setTodoList,
  completedTodoList,
  setCompletedTodoList,
}) => {
  const todoElements = todoList.map((todo, index) => {
    return (
      <SingleTodo
        index={index}
        key={todo.id}
        todo={todo}
        setTodoList={setTodoList}
      />
    );
  });
  const todoElementsCompleted = completedTodoList.map((todo, index) => {
    return (
      <SingleTodo
        index={index}
        key={todo.id}
        todo={todo}
        setTodoList={setCompletedTodoList}
      />
    );
  });

  return (
    <div className="container__todos">
      <Droppable droppableId="todoList">
        {(provided, snapshot) => (
          <div
            className={`container__todos__list ${
              snapshot.isDraggingOver ? "drag-active" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="container__todos__heading">Active Tasks</h2>
            {todoElements}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="todoListCompleted">
        {(provided, snapshot) => (
          <div
            className={`container__todos__list completed ${
              snapshot.isDraggingOver ? "drag-complete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="container__todos__heading">Completed Tasks</h2>
            {todoElementsCompleted}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
