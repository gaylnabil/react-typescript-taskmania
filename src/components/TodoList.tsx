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
    <div className="content__todos">
      <div className="content__todos__list">{todoElements}</div>
    </div>
  );
};

export default TodoList;
