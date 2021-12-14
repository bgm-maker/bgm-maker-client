import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoPlay, IoStop } from "react-icons/io5";
import { BsRecordCircle } from "react-icons/bs";
import * as Tone from "tone";

import { selectSequencerSamples } from "../../../feature/sequencerSamplesSlice";
import { selectDropZoneCount } from "../../../feature/sequencerDropZoneCountSlice";
import { selectedRecorder } from "../../../feature/instrumentSlice";
import { updateCurrentNote, initCurrentNote, selectCurrentNote } from "../../../feature/showCurrentNoteSlice";
import { selectNowPlayingSample, initNowPlayingSample } from "../../../feature/nowPlayingSampleSlice";
import Button from "../../common/atoms/Button";

export default function PlayerZone() {
  const sequencerAllSamples = useSelector(selectSequencerSamples);
  const currentNote = useSelector(selectCurrentNote);
  const recorder = useSelector(selectedRecorder);
  const noteCount = useSelector(selectDropZoneCount);
  const nowPlayingSample = useSelector(selectNowPlayingSample);
  const [isRecording, setIsRecording] = useState(false);
  const interval = useRef();
  const dispatch = useDispatch();

  function handleOnPlay() {
    if (Tone.Transport.state === "started") {
      handleOnStop();
    }

    if (nowPlayingSample.isPlaying) {
      nowPlayingSample.sample.stop();
      dispatch(initNowPlayingSample());
    }

    const intervalId = setInterval(() => {
      dispatch(updateCurrentNote());
    }, 540);
    interval.current = intervalId;
    Tone.Transport.bpm.value = 110;
    Tone.Transport.start();
    Tone.start();
  }

  function handleOnStop() {
    Tone.Transport.stop();
    clearInterval(interval.current);
    dispatch(initCurrentNote());

    Object.values(sequencerAllSamples).forEach((item) => {
      Object.values(item).forEach((target) => {
        target.sample.sample.stop();
      });
    });
  }

  async function handleOnRecord() {
    if (isRecording && Tone.Transport.state === "started") {
      handleOnStop();
      const recording = await recorder.stop();
      const url = URL.createObjectURL(recording);
      const anchor = document.createElement("a");
      anchor.download = "./recording.webm";
      anchor.href = url;
      anchor.click();
      setIsRecording(false);
      return;
    }

    handleOnPlay();
    setIsRecording(true);
    recorder.start();
  }

  useEffect(() => {
    const maxNoteCount = `${noteCount}:4`;

    if (maxNoteCount === currentNote) {
      handleOnStop();
    }
  }, [currentNote]);

  return (
    <EditButtonWrapper>
      <Button
        isRecording={isRecording}
        onClick={() => isRecording ? undefined : handleOnPlay()}>
        <IoPlay />
      </Button>
      <Button
        isRecording={isRecording}
        onClick={() => isRecording ? undefined : handleOnStop()}>
        <IoStop />
      </Button>
      <Button
        record
        isRecording={isRecording}
        onClick={handleOnRecord}>
        <BsRecordCircle />
      </Button>
    </EditButtonWrapper>
  );
}

const EditButtonWrapper = styled.div`
  display: flex;
  width: 90vw;
  height: 50px;
  justify-content: center;
  margin: 0px 5px 10px 5px;
`;
