import { useSelector } from "react-redux";
import { FcRefresh } from "react-icons/fc";

import InstrumentSampleSource from "./InstrumentSampleSource";
import { selectInstrument } from "../../feature/instrumentSlice";

export default function InstrumentSampleBox() {
  const instrument = useSelector(selectInstrument);

  return (
    <>
      {Object.entries(instrument).map(([inst, list], index) =>
        <div style={{ display: "flex" }} key={index}>
          <div style={{ width: 70, height: 40 }}>{inst}</div>
          <div>
            <InstrumentSampleSource sample={list[0]} />
            <FcRefresh />
          </div>
          <div>
            <InstrumentSampleSource sample={list[0]} />
            <FcRefresh />
          </div>
          <div>
            <InstrumentSampleSource sample={list[0]} />
            <FcRefresh />
          </div>
          <div>
            <InstrumentSampleSource sample={list[0]} />
            <FcRefresh />
          </div>
          <div>
            <InstrumentSampleSource sample={list[0]} />
            <FcRefresh />
          </div>
        </div>
      )}
    </>
  );
}
