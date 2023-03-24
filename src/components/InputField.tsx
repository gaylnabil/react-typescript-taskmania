import React, {
  Dispatch,
  SetStateAction,
  LegacyRef,
  ChangeEvent,
  FC,
} from "react";

interface IProps {
  setTodoText: Dispatch<SetStateAction<string>>;
  todoText: string;
  inputRef: LegacyRef<HTMLInputElement>;
}
const InputField: FC<IProps> = ({ todoText, setTodoText, inputRef }) => {
  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodoText(value);
  };

  return (
    <div className="input-field">
      <input
        ref={inputRef}
        className="input-field__box"
        type="text"
        placeholder="Enter you task"
        value={todoText}
        onChange={onHandleChange}
      />
      <button className="input-field__submit" type="submit">
        Go
      </button>
    </div>
  );
};

export default InputField;
