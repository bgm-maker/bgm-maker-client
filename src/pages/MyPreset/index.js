import * as Tone from "tone";

import SampleWaveForm from "../../components/MyPreset/SampleWaveForm";
import Header from "../../components/MyPreset/Header";
import EffectEditor from "../../components/MyPreset/EffectEditor";

export default function MyPreset({ history }) {
  const sampleSourceUrl = history.location.state;
  const cloneSample = new Tone.Player(sampleSourceUrl).toDestination();

  return (
    <div>
      <Header />
      <SampleWaveForm sampleSourceUrl={sampleSourceUrl} />
      <EffectEditor />
    </div>
  );
}
