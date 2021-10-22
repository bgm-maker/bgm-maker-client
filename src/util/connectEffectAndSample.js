import * as Tone from "tone";

export default function connectEffectAndSample(dropZoneRowSamples, effectName, effectValue) {
  switch (effectName) {
    case "reverb": {
      if (effectValue === 0) {
        dropZoneRowSamples?.forEach((sample) => {
          sample.disconnect();
          sample.toDestination();
        });
        break;
      }

      dropZoneRowSamples?.forEach((sample) => {
        const reverb = new Tone.Reverb(Number(effectValue)).toDestination();
        sample.connect(reverb);
      });
      break;
    }
    case "volume": {
      dropZoneRowSamples?.forEach((sample) => {
        sample.volume.value = effectValue;
      });
      break;
    }
    default: {
      throw new Error("failed to control the effect");
    }
  }
}
