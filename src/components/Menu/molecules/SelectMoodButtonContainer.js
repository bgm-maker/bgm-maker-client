import { lazy } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import SelectMoodButton from "../atom/SelectMoodButton";
import { createInstrumentSamples } from "../../../feature/instrumentSlice";
import selectRandomInstruments from "../../../util/selectRandomInstruments";
// const { createInstrumentSamples } = lazy(() => {
//   console.log(11111);
// import("../../../feature/instrumentSlice")
// });

export default function SelectMoodButtonContainer({ mood }) {
  const dispatch = useDispatch();
  const [moodValue, moodName] = mood;

  function handleMakeSampler(event) {
    const selectedMood = event.target.getAttribute("value");
    const selectedInstruments = selectRandomInstruments(selectedMood);
    dispatch(createInstrumentSamples({ selectedMood, selectedInstruments }));
  }

  return (
    <>
      <Link to="/main">
        <SelectMoodButton
          value={moodValue}
          onClick={handleMakeSampler}
        >{moodName}
        </SelectMoodButton>
      </Link>
    </>
  );
}
