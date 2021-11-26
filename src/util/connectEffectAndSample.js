import * as Tone from "tone";

export default function connectEffectAndSample(dropZoneRowSamples, effectName, effectValue) {
  switch (effectName) {
    case "reverb": {
      if (effectValue === 0) {
        for (const time in dropZoneRowSamples) {
          dropZoneRowSamples[time].sample.sample.disconnect();
          dropZoneRowSamples[time].sample.sample.toDestination();
        }
        break;
      }

      for (const time in dropZoneRowSamples) {
        const reverb = new Tone.Reverb(Number(effectValue)).toDestination();
        dropZoneRowSamples[time].sample.sample.connect(reverb);
      }
      break;
    }
    case "volume": {
      for (const time in dropZoneRowSamples) {
        dropZoneRowSamples[time].sample.sample.volume.value = effectValue;
      }
      break;
    }
    default: {
      throw new Error("failed to control the effect");
    }
  }
}
