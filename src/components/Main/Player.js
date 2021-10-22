import styled, { keyframes, css } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoPlay, IoStop } from "react-icons/io5";
import { BsRecordCircle } from "react-icons/bs";
import * as Tone from "tone";

import { selectSequencerSamples, initializeSequencerSamples } from "../../feature/sequencerSamplesSlice";
import { selectedRecorder } from "../../feature/instrumentSlice";
import { updateCurrentNote, initCurrentNote, selectCurrentNote } from "../../feature/showCurrentNoteSlice";

export default function Player({ time, nowPlayingSample }) {
  const { allSamples } = useSelector(selectSequencerSamples);
  const currentNote = useSelector(selectCurrentNote);
  const recorder = useSelector(selectedRecorder);
  const [isRecording, setIsRecording] = useState(false);
  const interval = useRef();
  const dispatch = useDispatch();

  function handleOnPlay() {
    dispatch(initializeSequencerSamples());

    nowPlayingSample[0]?.stop();
    Tone.Transport.start();
    Tone.start();

    const bpm = Tone.Transport.toSeconds("4n");
    const intervalId = setInterval(() => {
      dispatch(updateCurrentNote());
    }, 5);

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

  async function handleOnRecord() {
    if (Tone.Transport.state === "started") {
      Tone.Transport.stop();
      const recording = await recorder.stop();
      const url = URL.createObjectURL(recording);
      const anchor = document.createElement("a");
      anchor.download = "./recording.webm";
      anchor.href = url;
      anchor.click();
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    recorder.start();
    Tone.Transport.start();
    Tone.start();
  }

  useEffect(() => {
    const currentTime = `${time}:4`
    if (currentTime === currentNote) {
      handleOnStop();
    }

  }, [currentNote]);

  return (
    <EditButtonWrapper>
      <EditButton onClick={handleOnPlay}>
        <IoPlay />
      </EditButton>
      <EditButton onClick={handleOnStop}>
        <IoStop />
      </EditButton>
      <EditButton
        record
        isRecording={isRecording}
        onClick={handleOnRecord}>
        <BsRecordCircle />
      </EditButton>
    </EditButtonWrapper>
  );;
}

function blinkingEffect() {
  return keyframes`
    50% {
      opacity: 0.5;
    }
  `;
}

const EditButtonWrapper = styled.div`
  display: flex;
  width: 1200px;
  height: 50px;
  justify-content: center;
  margin: -25px 5px 10px 5px;
`;

const EditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height:40px;
  margin: 0 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #E6E6E6;
  border-radius: 4px;
  background-color: #e0d2c4;
  color: ${(props) => {
    if (props.record) {
      return "red";
    }
  }};
  font-size: 23px;
  box-shadow: 1.5px 1.5px 4px 1px #9E846B;

  ${(props) => {
    if (props.isRecording && props.record) {
      return css`
      animation: ${blinkingEffect} 1s linear infinite;
    `;
    }
  }};
`;
