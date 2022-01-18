import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, catogortState, toDosState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoList = () => {
  const toDos = useRecoilValue(toDosState);
  const [category, setCategory] = useRecoilState(catogortState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setCategory(value as Categories);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <select value={category} onInput={onInput}>
        <option value={Categories.toDo}>To Do</option>
        <option value={Categories.doing}>Doing</option>
        <option value={Categories.done}>Done</option>
      </select>
      <CreateToDo />
      <hr />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
