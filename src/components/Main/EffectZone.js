import { useState } from "react";
import { useSelector } from "react-redux";

import { INITIAL_VOLUME, INITIAL_REVERB } from "../../constants";
import connectEffectAndSample from "../../util/connectEffectAndSample";

export default function EffectZone({ isFirstDropZone, dropZoneRowNum }) {
  const [effect, setEffect] = useState({
    volume: INITIAL_VOLUME,
    reverb: INITIAL_REVERB,
  });
  const dropZoneRowSamples = useSelector((state) => state.samples[dropZoneRowNum]);

  function handleChangeEffectValue(event) {
    const { name, value } = event.target;
    const valueToNum = Number(value);

    connectEffectAndSample(dropZoneRowSamples, name, valueToNum);
    setEffect((prevValue) => ({ ...prevValue, [name]: valueToNum }));
  }

  return (
    <div style={isFirstDropZone ? { position: "relative", width: 100, height: 70, top: 19 } : { width: 100, height: 70 }}>
      <label htmlFor="Volume">Volume</label>
      <input type="range" min="-10" max="10" value={effect.volume} name="volume" onChange={handleChangeEffectValue} />
      <label htmlFor="Reverb">Reverb</label>
      <input type="range" min="0" max="10" value={effect.reverb} name="reverb" onChange={handleChangeEffectValue} />
    </div>
  );
}
