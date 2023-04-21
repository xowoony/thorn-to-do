import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";

//css
const Input = styled.input`
    padding: 1rem;
    width: 89.5%;
    height: 3rem;
    background-color: rgba(52, 52, 52, 0);
    border: 0.1rem solid rgb(94, 213, 137);
`;

const Button = styled.button`
  color:rgb(255,255,255);
  background-color: rgb(94, 213, 137);
  border: 0.1rem solid rgb(94, 213, 137);
  border-style: none;
  height: 3rem;
  width: 2.5rem;
`;

const Form = styled.form`
  width: 24rem;
`

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
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", {
          required: "please write a to do",
        })}
        placeholder="오늘 해야할 일을 입력하세요"
      />
      <Button>+</Button>
    </Form>
  );
}

export default CreateToDo;
