import { useEffect, useRef } from "react";
import styled from "styled-components";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
import * as Tone from "tone";

import CreateWaveManager from "../../customWrapper/waveManager";
import cutWaveUtil from "../../util/cutWave";
import { waveSurferDefaultOptions } from "../../customWrapper/defaultOptions";

export default function SampleWaveFormContainer({ setWaveHandler, sampleUrl }) {
  const waveFormEl = useRef("waveSurfer");
  const timeLineEl = useRef("timeline");

  useEffect(() => {
    const waveManager =
      CreateWaveManager(WaveSurfer, { TimelinePlugin, RegionsPlugin }, Tone, waveSurferDefaultOptions, { cutWaveUtil });
    const waveHandler = waveManager.create({
      container: waveFormEl.current,
    }, [{
      type: "TimelinePlugin",
      options: { container: timeLineEl.current },
    }, {
      type: "RegionsPlugin",
      options: {},
    }]);
    waveHandler.load(sampleUrl);

    setWaveHandler(waveHandler);
  }, []);

  return (
    <PageWrapper>
      <WaveFormWrapper>
        <WaveForm ref={waveFormEl}></WaveForm>
        <TimeLine ref={timeLineEl}></TimeLine>
      </WaveFormWrapper>
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
