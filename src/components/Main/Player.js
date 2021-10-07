import { useState, useEffect } from "react";
import * as Tone from "tone";

export default function Player() {
  const [curSynth, setCurSynth] = useState(null);

  function Instrument(synthType, synth) {
    this.synthType = synthType;
    this.synth = synth;
    this.gain = new Tone.Gain();
    this.gain.toDestination();
    this.default = this.defaultSettings();
  }

  Instrument.prototype.updateSynthType = function (synthType) {
    if (this.synth) {
      this.synth.disconnect(this.gain);
      this.synth.dispose();
    }
    let settings = this.default[synthType];
    this.synth = new Tone[synthType](settings || {});
    this.synth.connect(this.gain);
    this.synth.triggerAttackRelease("C4", "16n");
  }

  Instrument.prototype.defaultSettings = function () {
    return {
      Synth: {
        oscillator: { type: "triangle" },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.3,
          release: 1,
        },
      },
    };
  }

  function handleSynth(ev) {
    setCurSynth(ev.target.value);
  }

  useEffect(() => {
    if (!curSynth) return;

    let inst = new Instrument();
    inst.updateSynthType(curSynth);
  }, [curSynth])

  return (
    <>
      <button>start</button>
      <select name="synth" onChange={handleSynth}>
        <option value="nothing">선택해주세요</option>
        <option value="Synth">Synth</option>
        <option value="AMSynth">AMSynth</option>
        <option value="FMSynth">FMSynth</option>
      </select>
    </>
  );;
}
