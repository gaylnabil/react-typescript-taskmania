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
}

const SingleTodo: FC<IProps> = ({ todo, setTodoList }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  const todoDelete = (id: string): void => {
    setTodoList((prevList) => {
      return prevList.filter((obj) => {
        return obj.id !== id;
      });
    });
  };

  const todoEdit = (id: string): void => {
    setTodoList((prevList) => {
      return prevList.map((obj) => {
        return obj.id === id ? { ...obj, text: editText } : obj;
      });
    });
  };
  const todoIsDone = (id: string): void => {
    setTodoList((prevList) => {
      return prevList.map((obj) => {
        return obj.id === id ? { ...obj, isDone: !obj.isDone } : obj;
      });
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditable]);

  return (
    <form
      className="container__todos__form-single"
      onSubmit={(e) => {
        e.preventDefault();
        todoEdit(todo.id);
        setIsEditable(!isEditable);
      }}
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

export default SingleTodo;
