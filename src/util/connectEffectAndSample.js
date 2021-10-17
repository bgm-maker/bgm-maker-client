import * as Tone from "tone";

export default function connectEffectAndSample(dropZoneRowSamples, effectName, effectValue) {
  switch (effectName) {
    case "reverb": {
      if (effectValue === 0) {
        dropZoneRowSamples?.forEach((sample) => {
          sample[0].disconnect();
          sample[0].toDestination();
        });
        break;
      }

      dropZoneRowSamples?.forEach((sample) => {
        const reverb = new Tone.Reverb(Number(effectValue)).toDestination();
        sample[0].connect(reverb);
      });
      break;
    }
    case "volume": {
      dropZoneRowSamples?.forEach((sample) => {
        sample[0].volume.value = effectValue;
      });
      break;
    }
    default: {
      //여기는 에러를 던져줘야지.
      break;
    }
  }
}
