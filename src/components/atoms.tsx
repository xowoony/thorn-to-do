import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TODO" | "DOING" | "DONE";
}

// CreateToDo에서 이 toDoState를 사용할 수 있게 됨.
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
