import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdTabUnselected } from "react-icons/md";
import { BsScissors } from "react-icons/bs";
import { TiArrowBackOutline, TiArrowForwardOutline } from "react-icons/ti";
import { IoPlay, IoPause, IoStop, IoSaveOutline } from "react-icons/io5";
import styled from "styled-components";

import { saveEditedSample } from "../../../feature/instrumentSlice";
import Button from "../../common/atoms/Button";

export default function WavePlayerAndCutGroup({ waveHandler }) {
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
          <Button onClick={handleCutWave}>
            <BsScissors />
          </Button>
          :
          <Button onClick={handleToggleRegion}>
            <MdTabUnselected />
          </Button>
        }
        <Button onClick={handleRewindWave}>
          <TiArrowBackOutline />
        </Button>
        <Button onClick={handleForwardSample}>
          <TiArrowForwardOutline />
        </Button>
      </EditButtonWrapper>

      <EditButtonWrapper>
        {isPlaying ?
          <Button onClick={handleOnPause}>
            <IoPause />
          </Button> :
          <Button onClick={handleOnPlay}>
            <IoPlay />
          </Button>
        }
        <Button onClick={handleOnStop}>
          <IoStop />
        </Button>
        <Link to="/main">
          <Button onClick={handleSaveWave}>
            <IoSaveOutline />
          </Button>
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
