import styled from "styled-components";

import MoodSelectButton from "../../components/Menu/MoodSelectButton";
import { MOOD_TYPES } from "../../constants/index";

export default function MenuPage() {
  const moodList = Object.values(MOOD_TYPES);

  return (
    <StyledMenu>
      <Text>Make your own bgm</Text>
      <Border>
        {moodList.map((mood) => <MoodSelectButton mood={mood} />)}
      </Border>
    </StyledMenu>
  );
}

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  opacity: 0.8;
  background-image: url("https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9906583E5A3CB05E39");
`;

const Border = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 400px;
  margin-top: 25px;
  border-radius: 5px;;
  background-color: #e0cac7;
  box-shadow: 1px 1px 10px 3px #ccc;
`;

const Text = styled.div`
  margin-top: 30px;
  font-size: 40px;
  font-family: cursive;
  opacity: 0.7;
`;
