import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsPlayCircle, BsPauseCircle, BsRecordCircle } from "react-icons/bs";
import * as Tone from "tone";

import { selectSequencerSamples, initializeSequencerSamples } from "../../feature/sequencerSamplesSlice";
import { INITIAL_BPM_VALUE } from "../../constants";

export default function Player() {
  const [currentBpm, setCurrentBpm] = useState(INITIAL_BPM_VALUE);
  const sequencerSamplesList = useSelector(selectSequencerSamples);
  const dispatch = useDispatch();

  function handleOnPlay() {
    dispatch(initializeSequencerSamples());

    Tone.Transport.start();
    Tone.start();
  }

  function handleOnStop() {
    Tone.Transport.stop();

    sequencerSamplesList.forEach((sample) => {
      sample.stop();
    });
  }

  function handleChangeBpm(event) {
    setCurrentBpm(event.target.value);
  }

  return (
    <div style={{ position: "relative", display: "flex", top: 25, left: 500 }}>
      <div style={{ padding: 5 }}>
        <span>BPM</span>
        <input type="number" value={currentBpm} min="40" max="200" onChange={handleChangeBpm} style={{ width: 70, height: 20 }} />
      </div>
      <BsPlayCircle
        style={{ width: 30, height: 30, padding: 5 }}
        onClick={handleOnPlay}
      />
      <BsPauseCircle
        style={{ width: 30, height: 30, padding: 5 }}
        onClick={handleOnStop}
      />
      <BsRecordCircle
        style={{ width: 30, height: 30, padding: 5 }}
      />
    </div>
  );;
}
