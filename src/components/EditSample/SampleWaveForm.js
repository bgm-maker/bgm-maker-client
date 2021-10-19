import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { MdTabUnselected } from "react-icons/md"
import { BsScissors } from "react-icons/bs"
import { TiArrowBackOutline } from "react-icons/ti";
import { TiArrowForwardOutline } from "react-icons/ti";
import { IoPlay, IoPause, IoStop, IoSaveOutline } from "react-icons/io5";

import { saveEditedWaveSampled } from "../../feature/instrumentSlice";

export default function SampleWaveForm({ waveManager }) {
  const waveFormEl = useRef("waveSurfer");
  const timeLineEl = useRef("timeline");
  const [waveHandler, setWaveHandler] = useState(null);
  const [hasRegion, setHasRegion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const waveHandler = waveManager.create({
      container: waveFormEl.current,
    }, [{
      type: "TimelinePlugin",
      options: { container: timeLineEl.current },
    }, {
      type: "RegionsPlugin",
      options: {},
    }]);

    setWaveHandler(waveHandler);
  }, []);

  useEffect(() => {
    if (!waveHandler) return;

    waveHandler.load();
  }, [waveHandler]);

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

  function handleFadeIn() {
    waveHandler.toggleFadeIn();
  }

  function handleFadeOut() {
    waveHandler.toggleFadeOut();
  }

  function handleSaveWave() {
    const wave = waveHandler.getWave;
    dispatch(saveEditedWaveSampled(wave));
  }

  return (
    <PageWrapper>
      <WaveFormWrapper>
        {/* <span>여기는 이름 들어올곳</span> */}
        <WaveForm ref={waveFormEl}></WaveForm>
        <TimeLine ref={timeLineEl}></TimeLine>
      </WaveFormWrapper>
      <EditAndPlayerWrapper>
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
            <EditButton onClick={handleSaveWave}>
              <IoSaveOutline />
            </EditButton>
          </EditButtonWrapper>
        </div>
        <div>
          <FadeInOutToggleWrapper>
            <div>
              <p>Fade In</p>
              <SliderBox>
                <FadeInOutToggle type="checkbox" onClick={handleFadeIn} />
                <ToggleSlider></ToggleSlider>
              </SliderBox>
            </div>
            <div>
              <p>Fade Out</p>
              <SliderBox>
                <FadeInOutToggle type="checkbox" onClick={handleFadeOut} />
                <ToggleSlider></ToggleSlider>
              </SliderBox>
            </div>
          </FadeInOutToggleWrapper>
          <EffectWrapper>
            <p>Biquiad</p>
            <Range type="range" />
            <p>Wet</p>
            <Range type="range" />
            <p>compressor</p>
            <Range type="range" />
          </EffectWrapper>
        </div>
      </EditAndPlayerWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  margin-top: 90px;
`;

const WaveFormWrapper = styled.div`
  height: 400px;
  margin: 50px 0px 30px 50px;
  margin-top: 34px;
  background: white;
  padding: 20px;
  border-radius: 30px;
  box-shadow: 4px 4px 10px 2px #654e46;
`;

const WaveForm = styled.div`
  height: 400px;
  width: 800px;
`;

const TimeLine = styled.div`
  height: 70px;
`;

const EditAndPlayerWrapper = styled.div`
  width: 280px;
  height: 443px;
  margin: 32px 0 0 50px;
  background: white;
  border-radius: 30px;
  box-shadow: 4px 4px 10px 2px #654e46;
`;

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
  font-size: 23px;
  box-shadow: 1.5px 1.5px 4px 1px #9E846B;
`;

const FadeInOutToggleWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`;

const EffectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0 0 50px;
`;

const SliderBox = styled.label`
  position: relative;
  display: inline-block;
  width: 70px;
  height: 30px;
  vertical-align: middle;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  -webkit-transition: .4s;
  transition: .4s;

  &:before {
    position: absolute;
    content: "";
    height: 23px;
    width: 23px;
    left: 4px;
    bottom: 4px;
    border-radius: 50%;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
`;

const FadeInOutToggle = styled.input`
  display: none;

  &:checked {
    background-color: black;
    ${ToggleSlider}
  }

  &:checked + ${ToggleSlider}:before {
    -webkit-transform: translateX(36px);
    -ms-transform: translateX(36px);
    transform: translateX(36px);
  }
`;

const Range = styled.input`
  height: 25px;
  width: 190px;
  border-radius: 12px;
  margin-bottom: 8px;
  background-color: #93B5C6;
  background: white;
  box-shadow: 1px 1px 1px #C9CCD5, 0px 0px 1px #93B5C6;
  cursor: pointer;
  -webkit-appearance: none;
`;
