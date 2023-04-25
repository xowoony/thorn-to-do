import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

// enum
export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

// interface
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

// categoryState
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});

// recoil persist - 로컬스토리지 저장
const { persistAtom } = recoilPersist();

// toDoState
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// selector
// 이제 atom에서 값을 받아오지 않게되고 selector에서 값을 받아오게 된다.
// 그리고 selector는 atom을 받아서 그 atom을 변형하는 것이다.
// selector는 atom에서 뭉쳐있는 toDo를 분류하고 있다.
// 세개의 value를 리턴한다. (그 value들은 ToDoList.tsx 에서 잡고)
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    // 그 카테고리 인 toDo 메모만 걸러서 반환
    return toDos.filter((toDo) => toDo.category === category);
  },
});
