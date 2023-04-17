import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  password_check: string;
  // 그 외 또다른 에러가 발생했을 경우를 위한
  // 필수는 아니므로 ?를 붙여줌
  // 글고 밑에서 if문 있는 곳에서 써줌
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setError 를 꺼냈음 (react-hook-form에서)
    // setError는 특정한 에러를 발생키시게 해준다.
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  const onValid = (data: IForm) => {
    if (data.password !== data.password_check) {
      // password와 체크가 서로 일치하지 않는다면 setError
      // setError 적고 hover 해보면 뭐 적어야 할지 타입스크립트 덕분에 알 수 있음
      setError("password_check", { message: "패스워드가 다릅니다." });
    }
    // 그 외의 에러가 생겼을 경우
    setError("extraError", { message: "서버에 문제가 생겼습니다." });
  };

  console.log(errors);
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "이메일은 필수로 작성해주셔야 합니다.",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: "오직 naver.com 주소만 허용됩니다.",
            },
          })}
          placeholder="email을 입력해주세요."
        />
        <span>{errors?.email?.message as string}</span>
        <input
          {...register("firstname", { required: "firstname을 입력해주세요." })}
          placeholder="firstname을 입력해주세요."
        />
        <span>{errors?.firstname?.message as string}</span>
        <input
          {...register("lastname", { required: "lastname을 입력해주세요." })}
          placeholder="lastname을 입력해주세요."
        />
        <span>{errors?.lastname?.message as string}</span>
        <input
          {...register("username", {
            required: "username을 입력해주세요.",
            minLength: 3,
          })}
          placeholder="username을 입력해주세요."
        />
        <span>{errors?.username?.message as string}</span>
        <input
          {...register("password", {
            required: "password를 입력해주세요",
            minLength: { value: 5, message: "5자 이상으로 설정해주세요" },
          })}
          placeholder="password를 입력해주세요."
        />
        <span>{errors?.password?.message as string}</span>
        <input
          {...register("password_check", {
            required: "password를 한번 더 입력해주세요",
            minLength: { value: 5, message: "5자 이상으로 설정해주세요" },
          })}
          placeholder="password를 입력해주세요."
        />
        <span>{errors?.password_check?.message as string}</span>
        <button>추가</button>
        <span>{errors?.extraError?.message as string}</span>
      </form>
    </div>
  );
}

export default ToDoList;
