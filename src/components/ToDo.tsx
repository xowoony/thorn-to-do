import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";
import styled from "styled-components";

// css
const List = styled.li`
  height: 4rem;
  margin-top: 1rem;
  list-style: none;
  background-color: rgb(229 219 127 / 35%);
  width: 24rem;
  border: 0.1rem solid rgb(228 179 0 / 30%);
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 1090px) {
    width: 19rem;
    height: 3rem;
    font-size: 0.7rem;
  }
`;

const TextContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 1.5rem;
`;

const Text = styled.span``;

const ButtonContainer = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
  height: 100%;
`;

const Button = styled.button`
  border: none;
  color: #000000a1;
  background-color: #9e9e9e29;
  cursor: pointer;
  height: 100%;
  &:hover {
    background-color: #ffa60054;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <List>
      <TextContainer>
        <Text>{text}</Text>
      </TextContainer>
      <ButtonContainer>
        {category !== Categories.TODO && (
          <Button name={Categories.TODO} onClick={onClick}>
            TODO
          </Button>
        )}
        {category !== Categories.DOING && (
          <Button name={Categories.DOING} onClick={onClick}>
            DOING
          </Button>
        )}
        {category !== Categories.DONE && (
          <Button name={Categories.DONE} onClick={onClick}>
            DONE
          </Button>
        )}
      </ButtonContainer>
    </List>
  );
}

export default ToDo;
