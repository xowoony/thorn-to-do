// 이제 여기서 key는 필요하지 않기 때문에 삭제해준다.
// text prop은 반드시 필요하기 때문에
// ToDo({text}) 로 전달해주고
// 좋은 소식은 이미 toDo 타입을 만들었다는 것임 atoms.tsx에 있음
// 따라서 TODO({text}:IToDo) 라고 적어주고 import 하면 끝남

import { IToDo } from "./atoms";

function ToDo({ text, category }: IToDo) {
  return (
    <li>
      <span>{text}</span>
      {category !== "TODO" && <button>TODO</button>}
      {category !== "DOING" && <button>DOING</button>}
      {category !== "DONE" && <button>DONE</button>}
    </li>
  );
}

export default ToDo;
