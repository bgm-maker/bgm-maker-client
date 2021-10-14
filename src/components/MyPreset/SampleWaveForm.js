import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.js"

export default function SampleWaveForm({ sampleSourceUrl }) {
  const waveForm = useRef("waveSurfer");
  const timeLine = useRef("timeLine");

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: waveForm.current,
      backgroundColor: "gray",
      progressColor: "pink",
      waveColor: "skyblue",
      cursorWidth: 1.5,
      cursorColor: "green",
      height: 350,
      responsive: true,
      barMinHeight: 0.3,
      barWidth: 1.5,
      barGap: null,
      plugins: [
        TimelinePlugin.create({
          container: timeLine.current,
        })
      ]
    });

    waveSurfer.load(sampleSourceUrl);
  }, []);

  return (
    <div>
      <div ref={waveForm} style={{ width: 700 }}></div>
      <div ref={timeLine} style={{ width: 700 }}></div>
    </div>
  );
}
