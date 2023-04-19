import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "./atoms";



function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  // newCategory가 IToDo의 category 항목이라는 것을 알려줌
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // currentTarget으로 이벤트를 발생시킨 버튼의 name을 잡는다.
    const {
      currentTarget: { name },
    } = event;
  };

  return (
    <li>
      <span>{text}</span>
      {category !== "TODO" && (
        <button name="TODO" onClick={onClick}>
          TODO
        </button>
      )}
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          DOING
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          DONE
        </button>
      )}
    </li>
  );
}

export default ToDo;
