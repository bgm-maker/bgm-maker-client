import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdTabUnselected } from "react-icons/md";
import { BsScissors } from "react-icons/bs";
import { TiArrowBackOutline } from "react-icons/ti";
import { TiArrowForwardOutline } from "react-icons/ti";
import { IoPlay, IoPause, IoStop, IoSaveOutline } from "react-icons/io5";
import styled from "styled-components";

import { saveEditedSample } from "../../feature/instrumentSlice";

export default function PlayerAndCutTools({ waveHandler }) {
  const [hasRegion, setHasRegion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();

  function handleCutWave() {
    const { start, end } = waveHandler.getRegion;
    waveHandler.cutWave(start, end);

    setHasRegion(false);
  }

  function handleRewindWave() {
    waveHandler.rewindWave();
  }

  function handleForwardSample() {
    waveHandler.forwardWave();
  }

  function handleToggleRegion() {
    if (hasRegion) {
      waveHandler.removeRegion();
      setHasRegion(false);
      return;
    }

    waveHandler.addSingleRegion();
    setHasRegion(true);
  }

  function handleOnPlay() {
    waveHandler.play();
    setIsPlaying(true);
  }

  function handleOnPause() {
    waveHandler.pause();
    setIsPlaying(false);
  }

  function handleOnStop() {
    waveHandler.stop();
    setIsPlaying(false);
  }

  function handleSaveWave() {
    const sample = waveHandler.getWave;
    const sampleUrl = waveHandler.getUrl;

    dispatch(saveEditedSample({ sample, sampleUrl }));
  }

  return (
    <div>
      <EditButtonWrapper>
        {hasRegion ?
          <EditButton onClick={handleCutWave}>
            <BsScissors />
          </EditButton>
          :
          <EditButton onClick={handleToggleRegion}>
            <MdTabUnselected />
          </EditButton>
        }
        <EditButton onClick={handleRewindWave}>
          <TiArrowBackOutline />
        </EditButton>
        <EditButton onClick={handleForwardSample}>
          <TiArrowForwardOutline />
        </EditButton>
      </EditButtonWrapper>

      <EditButtonWrapper>
        {isPlaying ?
          <EditButton onClick={handleOnPause}>
            <IoPause />
          </EditButton> :
          <EditButton onClick={handleOnPlay}>
            <IoPlay />
          </EditButton>
        }
        <EditButton onClick={handleOnStop}>
          <IoStop />
        </EditButton>
        <Link to="/main">
          <EditButton onClick={handleSaveWave}>
            <IoSaveOutline />
          </EditButton>
        </Link>
      </EditButtonWrapper>
    </div>
  );
}

const EditButtonWrapper = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-around;
  margin: 15px 5px 10px 5px;
`;

const EditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height:40px;
  border-style: solid;
  border-width: 1px;
  border-color: #E6E6E6;
  border-radius: 4px;
  background-color: #e0d2c4;
  color: black;
  font-size: 23px;
  box-shadow: 1.5px 1.5px 4px 1px #9E846B;
`;
