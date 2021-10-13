import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsPlayCircle, BsPauseCircle, BsRecordCircle } from "react-icons/bs";
import * as Tone from "tone";

import { selectSequencerSamples, initializeSequencerSamples } from "../../feature/sequencerSamplesSlice";
import { updateCurrentNote, initCurrentNote, selectCurrentNote } from "../../feature/showCurrentNoteSlice";
import { INITIAL_BPM_VALUE } from "../../constants";

export default function Player({ test }) {
  const [currentBpm, setCurrentBpm] = useState(INITIAL_BPM_VALUE);
  const { allSamples } = useSelector(selectSequencerSamples);
  const currentNote = useSelector(selectCurrentNote);

  const interval = useRef();
  const dispatch = useDispatch();

  function handleOnPlay() {
    dispatch(initializeSequencerSamples());

    Tone.Transport.start();
    Tone.start();

    const bpm = Tone.Transport.toSeconds("4n");
    const intervalId = setInterval(() => {
      dispatch(updateCurrentNote());
    }, bpm * 1050);
    interval.current = intervalId;
  }

  function handleOnStop() {
    Tone.Transport.stop();

    allSamples.forEach((sample) => {
      sample.stop();
    });
    clearInterval(interval.current);
    dispatch(initCurrentNote());
  }

  function handleChangeBpm(event) {
    setCurrentBpm(event.target.value);
  }

  useEffect(() => {
    const ttest = `${test}:4`
    if (ttest === currentNote) {
      handleOnStop();
    }
  }, [currentNote]);

  return (
    <div style={{ position: "relative", display: "flex", top: 25, left: 500, width: 700 }}>
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
