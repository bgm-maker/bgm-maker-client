import { useEffect, useRef } from "react";
import styled from "styled-components";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
import * as Tone from "tone";

import CreateWaveManager from "../../../customWrapper/waveManager";
import cutWaveUtil from "../../../util/cutWave";
import { waveSurferDefaultOptions } from "../../../customWrapper/defaultOptions";

export default function WaveFormZone({ setWaveHandler, sampleUrl }) {
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
    <StyledWaveFormZone>
      <StyledWaveFormWrapper>
        <WaveForm ref={waveFormEl}></WaveForm>
        <TimeLine ref={timeLineEl}></TimeLine>
      </StyledWaveFormWrapper>
    </StyledWaveFormZone>
  );
}

const StyledWaveFormZone = styled.div`
  display: flex;
  margin-top: 5vw;
`;

const StyledWaveFormWrapper = styled.div`
  height: 65vh;
  margin: 0px 0px 30px 50px;
  background: white;
  padding: 1vw;
  border-radius: 30px;
  box-shadow: 4px 4px 10px 2px #654e46;
`;

const WaveForm = styled.div`
  height: 60vh;
  width: 60vw;
`;

const TimeLine = styled.div`
  height: 40vh;
`;
