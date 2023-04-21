import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";

//css
const Input = styled.input`
  width: 18rem;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: rgba(52, 52, 52, 0);
  border: 0.0625rem solid rgba(255, 255, 255, 0.86);
  margin-left: 2.3rem;
`;

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
      <Input
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
