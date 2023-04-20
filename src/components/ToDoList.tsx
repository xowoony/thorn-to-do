import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { categoryState, toDoSelector } from "./atoms";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };

  return (
    <div>
      <h1>Thorn To Do</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value="TODO">TODO</option>
        <option value="DOING">DOING</option>
        <option value="DONE">DONE</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;

// 주석풀기

// interface IForm {
//   email: string;
//   firstname: string;
//   lastname: string;
//   username: string;
//   password: string;
//   password_check: string;
//   // 그 외 또다른 에러가 발생했을 경우를 위한
//   // 필수는 아니므로 ?를 붙여줌
//   // 글고 밑에서 if문 있는 곳에서 써줌
//   extraError?: string;
// }

// 모든 마법들이 register 함수에서 일어난다.
// register 함수는 useForm hook을 사용해서 가져올 수 있다.
// 이 함수를 input에서 호출해주면 된다.
// function ToDoList() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     // setError 를 꺼냈음 (react-hook-form에서)
//     // setError는 특정한 에러를 발생키시게 해준다.
//     setError,
//   } = useForm<IForm>({
//     defaultValues: {
//       email: "@naver.com",
//     },
//   });

//   const onValid = (data: IForm) => {
//     if (data.password !== data.password_check) {
//       // password와 체크가 서로 일치하지 않는다면 setError
//       // setError 적고 hover 해보면 뭐 적어야 할지 타입스크립트 덕분에 알 수 있음
//       // shouldFocus:true 를 적어주면 비번체크가 틀렸을 경우 이곳으로 포커스가 가게 된다.
//       setError(
//         "password_check",
//         { message: "패스워드가 다릅니다." },
//         { shouldFocus: true }
//       );
//     }
//     // 그 외의 에러가 생겼을 경우
//     setError("extraError", { message: "서버에 문제가 생겼습니다." });
//   };

//   console.log(errors);
//   return (
//     <div>
//       <form
//         style={{
//           display: "flex",
//           flexDirection: "column",
//         }}
//         onSubmit={handleSubmit(onValid)}
//       >
//         <input
//           {...register("email", {
//             required: "이메일은 필수로 작성해주셔야 합니다.",
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
//               message: "오직 naver.com 주소만 허용됩니다.",
//             },
//           })}
//           placeholder="email을 입력해주세요."
//         />
//         <span>{errors?.email?.message as string}</span>
//         <input
//           // 이름에 사울을 포함할 때 사용할 수 없다는 메시지가 출력되고,
//           // 이름에 사울이 없을 경우 true를 반환.
//           // validate는 객체로 만들어 줄 수 있음
//           // 즉 여러 확인 절차가 필요할 경우엔 객체로 만들어 주면 됨
//           {...register("firstname", {
//             required: "firstname을 입력해주세요.",
//             validate: {
//               noSaul: (value) =>
//                 value.includes("사울")
//                   ? "사울이라는 이름은 사용할 수 없습니다."
//                   : true,
//               noNick: (value) =>
//                 value.includes("닉")
//                   ? "닉이라는 이름은 사용할 수 없습니다."
//                   : true,
//             },
//           })}
//           placeholder="firstname을 입력해주세요."
//         />
//         <span>{errors?.firstname?.message as string}</span>
//         <input
//           {...register("lastname", { required: "lastname을 입력해주세요." })}
//           placeholder="lastname을 입력해주세요."
//         />
//         <span>{errors?.lastname?.message as string}</span>
//         <input
//           {...register("username", {
//             required: "username을 입력해주세요.",
//             minLength: 3,
//           })}
//           placeholder="username을 입력해주세요."
//         />
//         <span>{errors?.username?.message as string}</span>
//         <input
//           {...register("password", {
//             required: "password를 입력해주세요",
//             minLength: { value: 5, message: "5자 이상으로 설정해주세요" },
//           })}
//           placeholder="password를 입력해주세요."
//         />
//         <span>{errors?.password?.message as string}</span>
//         <input
//           {...register("password_check", {
//             required: "password를 한번 더 입력해주세요",
//             minLength: { value: 5, message: "5자 이상으로 설정해주세요" },
//           })}
//           placeholder="password를 입력해주세요."
//         />
//         <span>{errors?.password_check?.message as string}</span>
//         <button>추가</button>
//         <span>{errors?.extraError?.message as string}</span>
//       </form>
//     </div>
//   );
// }

// export default ToDoList;
