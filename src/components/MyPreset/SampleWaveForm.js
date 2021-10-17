import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { saveEditedWaveSampled } from "../../feature/instrumentSlice";

export default function SampleWaveForm({ waveManager }) {
  const waveFormEl = useRef("waveSurfer");
  const timeLineEl = useRef("timeline");
  const [waveHandler, setWaveHandler] = useState(null);
  const [hasRegion, setHasRegion] = useState(false);
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
  }

  function handleOnPause() {
    waveHandler.pause();
  }

  function handleOnStop() {
    waveHandler.stop();
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
    <div>
      <div>
        <button onClick={handleToggleRegion}>{hasRegion ? "취소" : "선택하기"}</button>
        <button onClick={handleCutWave}>자르기</button>
        <button onClick={handleRewindWave}>되돌리기</button>
        <button onClick={handleForwardSample}>되돌리기취소</button>

        <span>여기는 이름 들어올곳</span>
        <div ref={waveFormEl} style={{ width: 700 }}></div>
        <div ref={timeLineEl} style={{ width: 700 }}></div>

        <button onClick={handleOnPlay}>재생하기</button>
        <button onClick={handleOnPause}>일시정지</button>
        <button onClick={handleOnStop}>멈춤</button>
        <button onClick={handleSaveWave}>저장하기</button>
      </div>

      <div>
        <button onClick={handleFadeIn}>fadeout</button>
        <button onClick={handleFadeOut}>fadeIn</button>
        <label>biquad</label>
        <input type="range" />
        <label>wet</label>
        <input type="range" />
        <label>compressor</label>
        <input type="range" />
      </div>
    </div>
  );
}
