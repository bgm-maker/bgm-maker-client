import { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
import * as Tone from "tone";

import cutWave from "../../util/cutWave";

export default function SampleWaveForm({ sampleSourceUrl }) {
  const waveFormEl = useRef("waveSurfer");
  const timeLineEl = useRef("timeLine");
  const waveSurferInstance = useRef();
  const [bufferList, setBufferList] = useState([]);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: waveFormEl.current,
      backgroundColor: "gray",
      progressColor: "pink",
      waveColor: "skyblue",
      cursorWidth: 2.5,
      cursorColor: "green",
      height: 350,
      responsive: true,
      barMinHeight: 0.3,
      barWidth: 1.5,
      barGap: null,
      skipLength: 1,
      plugins: [
        TimelinePlugin.create({
          container: timeLineEl.current,
        }),
        RegionsPlugin.create({})
      ]
    });

    waveSurfer.load(sampleSourceUrl);
    waveSurfer.on("ready", () => {
      const buffer = waveSurfer.backend.buffer;
      setBufferList((prev) => [...prev, buffer]);
    });

    waveSurferInstance.current = waveSurfer;
  }, []);

  function handleCutSample() {
    const { start, end } = region;
    const { cutSelectionBuffer } = cutWave({ start, end }, waveSurferInstance.current);
    waveSurferInstance.current.backend.buffer = cutSelectionBuffer;
    waveSurferInstance.current.drawBuffer();
    region.remove();
    setBufferList((prev) => [...prev, cutSelectionBuffer]);
    setRegion(null);
  }

  function handleRewindSample() {
    const nowBuffer = waveSurferInstance.current.backend.buffer;
    const nowBufferIndex = bufferList.indexOf(nowBuffer);

    if (nowBufferIndex === 0) return;

    const prevBuffer = bufferList[nowBufferIndex - 1];
    waveSurferInstance.current.backend.buffer = prevBuffer;
    waveSurferInstance.current.drawBuffer();
  }

  function handleForwardSample() {
    const nowBuffer = waveSurferInstance.current.backend.buffer;
    const nowBufferIndex = bufferList.indexOf(nowBuffer);

    if (nowBufferIndex === bufferList[bufferList.length - 1]) return;

    const forwardBuffer = bufferList[nowBufferIndex + 1];
    waveSurferInstance.current.backend.buffer = forwardBuffer;
    waveSurferInstance.current.drawBuffer();
  }

  function handleAddRegion() {
    if (region) {
      region.remove();
      setRegion(null);
      return;
    }

    const regionId = waveSurferInstance.current.addRegion({
      start: 4,
      end: 7,
      color: "rgba(0,1,1,0.2)",
    });

    setRegion(regionId);
  }

  function handleOnPlay() {
    if (region) {
      region.play();
      return;
    }

    waveSurferInstance.current.playPause();
  }


  return (
    <div>
      <button onClick={handleAddRegion}>{region ? "취소" : "선택하기"}</button>
      <button onClick={handleCutSample}>자르기</button>
      <button onClick={handleRewindSample}>되돌리기</button>
      <button onClick={handleForwardSample}>되돌리기취소</button>
      <span>여기는 이름 들어올곳</span>
      <div ref={waveFormEl} style={{ width: 700 }}></div>
      <div ref={timeLineEl} style={{ width: 700 }}></div>
      <button onClick={handleOnPlay}>재생하기</button>
    </div>
  );
}
