import React, { Dispatch, SetStateAction, useRef, FC, FormEvent } from "react";
import InputField from "./InputField";
import "./style.css";
import { Todo } from "./../models/Todo";
import { nanoid } from "nanoid";
interface IProps {
  todoText: string;
  setTodoText: Dispatch<SetStateAction<string>>;
  addTodo: (todo: Todo) => void;
}

const UseForm: FC<IProps> = ({ todoText, setTodoText, addTodo }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (todoText) {
      addTodo({
        id: nanoid(),
        text: todoText,
        isDone: false,
        createdAt: new Date(),
      });

      setTodoText("");
    }
  };

  return (
    <form
      className="form-input"
      onSubmit={(e) => {
        onSubmit(e);
        inputRef.current?.blur();
      }}
    >
      <InputField
        inputRef={inputRef}
        todoText={todoText}
        setTodoText={setTodoText}
      />
    </form>
  );
};

export default UseForm;
