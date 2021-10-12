import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getInstruments } from "../../feature/instrumentSlice";
import selectRandomInstruments from "../../util/selectRandomInstruments";

export default function MoodSelectButton({ mood }) {
  const dispatch = useDispatch();
  const [moodValue, moodName] = mood;

  function handleMakeSampler(event) {
    const selectedMood = event.target.value;
    const selectedInstruments = selectRandomInstruments(selectedMood);
    dispatch(getInstruments({ selectedMood, selectedInstruments }));
  }

  return (
    <Link to="/main">
      <button
        value={moodValue}
        onClick={handleMakeSampler}
      >{moodName}
      </button>
    </Link>
  );
}
