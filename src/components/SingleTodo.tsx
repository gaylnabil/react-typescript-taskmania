import React, { FC, Dispatch, SetStateAction } from "react";
import { Todo } from "./../models/Todo";
import { Draggable } from "react-beautiful-dnd";
import Task from "./Task";

/**
 * Interface defining props for a Todo component.
 *
 * @interface IProps
 */
interface IProps {
  todo: Todo;
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
  index: number;
}

/**
 * A functional component that renders a single todo item and provides
 * functionality to edit, delete, * and mark it as done. Uses React DnD
 * library for drag-and-drop functionality.
 *
 * @param {Object} props - The props object containing the todo item data,
 * setTodoList function to update * the parent state of todo list,
 * and index of this item in the list.
 */

const SingleTodo: FC<IProps> = ({ todo, setTodoList, index }) => {
  return (
    <Draggable draggableId={String(todo.id)} index={index}>
      {(provided, snapshot) => (
        <Task
          todo={todo}
          provided={provided}
          snapshot={snapshot}
          setTodoList={setTodoList}
        />
      )}
    </Draggable>
  );
};

export default SingleTodo;
