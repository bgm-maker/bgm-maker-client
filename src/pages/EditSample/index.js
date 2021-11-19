import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
import * as Tone from "tone";
import styled from "styled-components";

import CreateWaveManager from "../../customWrapper/waveManager";
import cutWaveUtil from "../../util/cutWave";
import { waveSurferDefaultOptions } from "../../customWrapper/defaultOptions";
import SampleWaveForm from "../../components/EditSample/SampleWaveForm";
import Header from "../../components/common/Header";

export default function EditSamplePage({ history }) {
  const sampleUrl = history.location.state;
  const waveManager =
    CreateWaveManager(WaveSurfer, { TimelinePlugin, RegionsPlugin }, Tone, waveSurferDefaultOptions, { cutWaveUtil });

  return (
    <StyledEditSamplePage>
      <Header>/main</Header>
      <SampleWaveForm waveManager={waveManager} sampleUrl={sampleUrl} />
    </StyledEditSamplePage>
  );
}

const StyledEditSamplePage = styled.div`
  height: 100vh;
  display: flex;
  background-color: #e0d2c4;
`;
