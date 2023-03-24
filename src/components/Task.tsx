import React, {
  useState,
  FC,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";
import { Todo } from "./../models/Todo";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";

interface IProps {
  todo: Todo;
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
  provided: any;
  snapshot: any;
}

const Task: FC<IProps> = ({ todo, setTodoList, provided, snapshot }) => {
  //
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditable]);
  /**
   * Deletes a todo item from the todo list based on its ID.
   *
   * @param id The ID of the todo item to delete.
   */
  const todoDelete = (id: string): void => {
    setTodoList((prevList) => {
      return prevList.filter((obj) => {
        return obj.id !== id;
      });
    });
  };

  /**
   * Edit a todo item in the list by updating its text property.
   *
   * @param id - The unique identifier of the todo item to edit.
   */
  const todoEdit = (id: string): void => {
    setTodoList((prevList) => {
      return prevList.map((obj) => {
        return obj.id === id ? { ...obj, text: editText } : obj;
      });
    });
  };

  /**
   * Updates the "isDone" property of a todo item with the given ID in the todoList state.
   *
   * @param {string} id - The ID of the todo item to update.
   */
  const todoIsDone = (id: string): void => {
    setTodoList((prevList) => {
      return prevList.map((obj) => {
        return obj.id === id ? { ...obj, isDone: !obj.isDone } : obj;
      });
    });
  };

  return (
    <form
      className={`container__todos__form-single ${
        snapshot.isDragging ? "drag" : ""
      }`}
      onSubmit={(e) => {
        e.preventDefault();
        todoEdit(todo.id);
        setIsEditable(!isEditable);
      }}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {isEditable ? (
        <input
          ref={inputRef}
          className="container__todos__single-text"
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : todo.isDone ? (
        <s className="container__todos__single-text" key={todo.id}>
          {todo.text}
        </s>
      ) : (
        <span className="container__todos__single-text" key={todo.id}>
          {todo.text}
        </span>
      )}
      <div>
        {!todo.isDone && (
          <span
            className="icon"
            onClick={(e) => {
              if (!todo.isDone) setIsEditable(!isEditable);
            }}
          >
            <AiFillEdit />
          </span>
        )}
        <span className="icon" onClick={(e) => todoDelete(todo.id)}>
          <AiFillDelete />
        </span>

        <span className="icon" onClick={(e) => todoIsDone(todo.id)}>
          <MdOutlineDone />
        </span>
      </div>
    </form>
  );
};

export default Task;
