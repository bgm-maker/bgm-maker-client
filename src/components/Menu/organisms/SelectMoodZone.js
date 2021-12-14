import styled from "styled-components";

import SelectMoodButtonContainer from "../molecules/SelectMoodButtonContainer";
import { MOOD_TYPES } from "../../../constants";

export default function SelectMoodZone() {
  const moodList = Object.values(MOOD_TYPES);

  return (
    <StyledMoodSelectWrapper>
      <Text>Make your own bgm</Text>
      <StyledMoodSelect>
        {moodList.map((mood) => <SelectMoodButtonContainer mood={mood} />)}
      </StyledMoodSelect>
    </StyledMoodSelectWrapper>
  );
}

const StyledMoodSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 80px;
`;

const StyledMoodSelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  width: 50vw;
  margin-top: 25px;
  border-radius: 5px;;
  background-color: #e0cac7;
  box-shadow: 1px 1px 10px 3px #ccc;
`;

const Text = styled.div`
  font-size: 5vw;
  font-family: cursive;
  opacity: 0.7;
`;
