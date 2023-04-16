import { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const [toDoError, setToDoError] = useState("");

//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDoError("");
//     setToDo(value);
//   };

// const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   if (toDo.length < 10) {
//     return setToDoError("To do should be longer~~");
//   }
//   console.log("submit");
// };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           value={toDo}
//           onChange={onChange}
//           placeholder="오늘 해야할 일을 입력하세요"
//         />
//         <button>추가</button>
//         {toDoError !== "" ? toDoError : null}
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  // useForm hook 사용하기
  // register 함수사용 => onChange 이벤트 핸들러가 필요없음, onChange, value 등등 props들도 필요없어짐
  // setState도 필요없음
  // useForm 함수는 많은 것들을 제공함. 그 중 하나는 watch이다.
  // watch는 form의 입력값들의 변화를 관찰 할 수 있게 해주는 함수이다.
  // onValid 만약 데이터가 유효하지 않다면 useForm이 에러를 보여주게됨.
  // onValid 함수는 react-hook-form이 모든 validation을 다 마쳤을 때만 호출될 것임
  // form에 onSubmit을 써주고
  const { register, handleSubmit } = useForm();

  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      {/*onSubmit을 써줌*/}
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("email")} placeholder="email을 입력해주세요." />
        <input
          {...register("firstname")}
          placeholder="firstname을 입력해주세요."
        />
        <input
          {...register("lastname")}
          placeholder="lastname을 입력해주세요."
        />
        <input
          {...register("username")}
          placeholder="username을 입력해주세요."
        />
        <input
          {...register("password")}
          placeholder="password을 입력해주세요."
        />
        <input
          {...register("password1")}
          placeholder="password1을 입력해주세요."
        />
        <button>추가</button>
      </form>
    </div>
  );
}

export default ToDoList;
