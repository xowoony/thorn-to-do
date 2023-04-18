import { link } from "fs";
import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

// 4. 이제 atom의 type이 ToDo의 배열임을 알려주도록 하자.
// atom<IToDo[]> 를 작성해준다.
const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

// 3. 타입스크립트에게 toDo가 어떻게 생겼는지 알려주기 위한 인터페이스
// toDoState는 toDo들의 배열이라는 것을 알려주도록 하겠다.
// category는 'DONE', 'DOING', 'TODO'만 받을 수 있다고 알려주도록 한다.
// 이제 ToDo를 만들면 모든 string이 아닌, 명시된 3개 중 하나의 string만을 가져야 한다.
interface IToDo {
  text: string;
  // 9. id도 만들어 줌
  id: number;
  category: "TODO" | "DOING" | "DONE";
}

interface IForm {
  toDo: string;
}

function ToDoList() {
  // 5. 이제 타입스크립트는 우리의 toDos가 IToDo 객체로 이뤄진 배열임을 알게되었다.
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  // 8. data => {toDo} 로 바꿔준다.
  const handleValid = ({ toDo }: IForm) => {
    // 7. 그리고 여기서는 state를 바꿔줄 것이다.
    // setToDos 함수는 두개의 동작을 할 수 있다.
    // state를 직접적으로 설정해 줄 수도 있고, 아니면 다른 함수를 받을 수도 있다.
    // () 안에 함수를 쓴다면, 함수의 리턴값이 새로운 state가 될 것이다.
    // 이전의 state를 oldToDos로 받아서 배열을 반환해줄 것이다.
    // 그렇게 되면 이 배열은 oldToDos의 모든 요소를 가지게 된다.
    // 보다시피 oldToDos는 배열이다.
    // setToDos((oldToDos) => [oldToDos]); 이런 방식으로 하면 배열안에 배열이 들어가버린 꼴이 되므로 안되고
    // 내가 원하는 건 oldToDo의 요소들이 들어있는 배열을 반환해야 하므로
    // setToDos((oldToDos) => [...oldToDos]); 로 써준다. 이것은 배열안의 요소를 반환하게 된다.
    // 지금까지를 보면 단순히 oldToDo를 받아서 oldToDo를 반환한다.
    // 내가 해야 할 것은 새로운 ToDo를 넣어주는 것이다.
    // 따라서 안에 객체를 만들고
    // 우리의 데이터는 data.toDo에 있고, data는 react-hook-form에서 넘어온다.
    // 그리고 이 data.toDo는 밑에 있는 input에서 온 것이다.
    // {text:toDo} 를 써주면서 이제 text를 사용한다고 말해 줄 것이다.
    // 새로운 ToDo의 text는 toDo로부터 오는 것이다.
    // 그리고 카테고리도 작성해준다.
    // 모든 ToDo를 TODO로부터 시작할 것이기 때문에 TODO로 적어준다.
    setToDos((oldToDos) => [
      // 10. id를 써준다.
      { text: toDo, category: "TODO", id: Date.now() },
      ...oldToDos,
    ]);
    setValue("toDo", "");
    // 1. setToDos(["hello"]) 이렇게 "hello"를 넣은 배열을 넣을려고 한다면
    // 2. 타입스크립트에서는 ToDos가 항상 빈 배열이어야 하기 때문에 이 동작은 허용되지 않는다.
  };

  // 6. 일단 여기서 state를 console.log 해보도록 하자.
  console.log(toDos);

  // 5. 이제 하고자 하는 것은 폼이 제출되고 데이터가 모두 유효하다면,
  // state(상태)를 바꿀 것이다.
  return (
    <div>
      <h1>Thorn To Do</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "please write a to do",
          })}
          placeholder="오늘 해야할 일을 입력하세요"
        />
        <button>add</button>
      </form>
      {/* 11. 각각의 ToDo에 대해 li를 반환할 것이고, key는 toDo.id를 사용 */}
      <ul>
         {toDos.map(toDo => <li key={toDo.id}>{toDo.text}</li>)}
      </ul>
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
