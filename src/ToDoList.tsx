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
  const { register, handleSubmit, formState } = useForm();

  const onValid = (data: any) => {
    console.log(data);
  };

  // formState를 이용하여 error 표시하기
  console.log(formState.errors);

  return (
    <div>
      {/*onSubmit을 써줌*/}
      {/* javascript로 required:true 를 주도록 한다. html로부터 보호받지 못하는 환경이 있을 수 있기 때문이다.*/}
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "naver.com 주소만 허용됩니다.",
            },
          })}
          placeholder="email을 입력해주세요."
        />
        <input
          {...register("firstname", { required: true })}
          placeholder="firstname을 입력해주세요."
        />
        <input
          {...register("lastname", { required: true })}
          placeholder="lastname을 입력해주세요."
        />
        <input
          {...register("username", { required: true, minLength: 3 })}
          placeholder="username을 입력해주세요."
        />
        <input
          {...register("password", { required: true, minLength: 10 })}
          placeholder="password을 입력해주세요."
        />
        <input
          {...register("password1", {
            required: true,
            minLength: { value: 5, message: "Your password is too short!" },
          })}
          placeholder="password1을 입력해주세요."
        />
        <button>추가</button>
      </form>
    </div>
  );
}

export default ToDoList;
