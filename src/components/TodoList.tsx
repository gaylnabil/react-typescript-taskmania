import React, { FC, Dispatch, SetStateAction } from "react";
import { Todo } from "./../models/Todo";
import SingleTodo from "./SingleTodo";
interface IProps {
  todoList: Todo[];
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
}
/**
 *
 * @param props
 * @returns
 */
const TodoList: FC<IProps> = ({ todoList, setTodoList }) => {
  const todoElements = todoList.map((todo) => {
    return <SingleTodo key={todo.id} todo={todo} setTodoList={setTodoList} />;
  });

  return (
    <div className="container__todos">
      {/* <div className="container__todos__list">{todoElements}</div> */}
      <div className="container__todos__list">
        <h2 className="container__todos__heading">Active Tasks</h2>
        {todoElements}
      </div>
      <div className="container__todos__list completed">
        <h2 className="container__todos__heading">Task Completed</h2>
        {todoElements}
      </div>
    </div>
  );
};

export default TodoList;
