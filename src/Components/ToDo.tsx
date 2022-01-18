import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as Categories };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.doing && (
        <button name={Categories.doing} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.toDo && (
        <button name={Categories.toDo} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.done && (
        <button name={Categories.done} onClick={onClick}>
          Done
        </button>
      )}
      <button
        onClick={() =>
          setToDos((toDos) => toDos.filter((toDo) => toDo.id !== id))
        }
      >
        Delete
      </button>
    </li>
  );
};

export default ToDo;
