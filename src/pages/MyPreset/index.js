import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
import * as Tone from "tone";

import CreateWaveManager from "../../customWrapper/waveManager";
import cutWaveUtil from "../../util/cutWave";
import { waveSurferDefaultOptions } from "../../customWrapper/defaultOptions";
import SampleWaveForm from "../../components/MyPreset/SampleWaveForm";
import Header from "../../components/MyPreset/Header";
import EffectEditor from "../../components/MyPreset/EffectEditor";

export default function MyPreset({ history }) {
  const sampleSourceUrl = history.location.state;
  const waveManager =
    CreateWaveManager(WaveSurfer, { TimelinePlugin, RegionsPlugin }, Tone, sampleSourceUrl, waveSurferDefaultOptions, { cutWaveUtil });

  return (
    <div>
      <Header />
      <SampleWaveForm waveManager={waveManager} />
      <EffectEditor waveManager={waveManager} />
    </div>
  );
}
