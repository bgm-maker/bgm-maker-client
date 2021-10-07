import { useSelector } from "react-redux";

import InstrumentSampleSource from "./InstrumentSampleSource";
import { selectInstrument } from "../../feature/instrumentSlice";

export default function InstrumentSampleBox() {
  const instrument = useSelector(selectInstrument);

  return (
    <>
      {instrument.map(([instrumentType, samples], index) =>
        <div style={{ display: "flex" }} key={index}>
          <div style={{ width: 70, height: 40, borderStyle: "solid" }}>{instrumentType}</div>
          <InstrumentSampleSource sample={samples[index]} />
          <InstrumentSampleSource sample={samples[index]} />
          <InstrumentSampleSource sample={samples[index]} />
          <InstrumentSampleSource sample={samples[index]} />
          <InstrumentSampleSource sample={samples[index]} />
        </div>
      )}
    </>
  );
}
