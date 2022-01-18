import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { catogortState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(catogortState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setToDos((prev) => [{ id: Date.now(), text: toDo, category }, ...prev]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", { required: "ToDo is required" })}
        placeholder="Write a to do"
      />
      <button>Add</button>
      <span>{errors.toDo?.message}</span>
    </form>
  );
};

export default CreateToDo;
