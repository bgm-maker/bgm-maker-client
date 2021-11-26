import styled from "styled-components";

import SelectMoodButtonContainer from "../molecules/SelectMoodButtonContainer";
import { MOOD_TYPES } from "../../../constants";

export default function SelectMoodZone() {
  const moodList = Object.values(MOOD_TYPES);

  return (
    <>
      <Text>Make your own bgm</Text>
      <StyledMoodSelect>
        {moodList.map((mood) => <SelectMoodButtonContainer mood={mood} />)}
      </StyledMoodSelect>
    </>
  );
}

const StyledMoodSelect = styled.div`
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
