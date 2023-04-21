import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  // toDos는 필요없다.
  // 수정말 할 수 있으면 되기 때문에 useSetRecoilState로 setToDos를 정의
  // toDoState를 ataom으로 부터 불러오게됨.
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      ...oldToDos,
      { text: toDo, id: Date.now(), category },
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "please write a to do",
        })}
        placeholder="오늘 해야할 일을 입력하세요"
      />
      <button>add</button>
    </form>
  );
}

export default CreateToDo;
