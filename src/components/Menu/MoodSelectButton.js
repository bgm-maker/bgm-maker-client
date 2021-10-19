import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { getInstruments } from "../../feature/instrumentSlice";
import selectRandomInstruments from "../../util/selectRandomInstruments";

export default function MoodSelectButton({ mood }) {
  const dispatch = useDispatch();
  const [moodValue, moodName] = mood;

  function handleMakeSampler(event) {
    const selectedMood = event.target.getAttribute("value");
    const selectedInstruments = selectRandomInstruments(selectedMood);
    dispatch(getInstruments({ selectedMood, selectedInstruments }));
  }

  return (
    <div>
      <Link to="/main">
        <SelectMoodButton
          value={moodValue}
          onClick={handleMakeSampler}
        > {moodName}
        </SelectMoodButton>
      </Link>
    </div>
  );
}

const SelectMoodButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 100px;
  color: black;
  border-radius: 5px;
  margin: 10px;
  background-color: #e0d2c4;
  font-size: 20px;
  font-family: gowun;
  opacity: 0.8;
  box-shadow: 0px 5px 10px #ede6e1 inset, 0px -5px 8px #afa49c inset;
`;
