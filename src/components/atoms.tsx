import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TODO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

// selector
// 이제 atom에서 값을 받아오지 않게되고 selector에서 값을 받아오게 된다.
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return [
      toDos.filter((toDo) => toDo.category === "TODO"),
      toDos.filter((toDo) => toDo.category === "DOING"),
      toDos.filter((toDo) => toDo.category === "DONE"),
    ];
  },
});
