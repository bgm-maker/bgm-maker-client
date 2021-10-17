import { useState } from "react";
import { useSelector } from "react-redux";
import { FcRefresh } from "react-icons/fc";

import InstrumentSampleSource from "./InstrumentSampleSource";
import { selectInstrument, selectEditedWaveSample } from "../../feature/instrumentSlice";

export default function InstrumentSampleBox({ history }) {
  const instrument = useSelector(selectInstrument);
  const myInstrument = useSelector(selectEditedWaveSample);
  const [myPresetList, setMyPresetList] = useState([]);

  function handleGetEditedWaveSample() {
    setMyPresetList(myInstrument);
  }

  return (
    <>
      {Object.entries(instrument).map(([inst, list], index) =>
        <div style={{ display: "flex" }} key={index}>
          <div style={{ width: 70, height: 40 }}>{inst}</div>
          <div>
            <InstrumentSampleSource sample={list[0]} history={history} />
            <FcRefresh />
          </div>
          <div>
            <InstrumentSampleSource sample={list[0]} history={history} />
            <FcRefresh />
          </div>
          <div>
            <InstrumentSampleSource sample={list[0]} history={history} />
            <FcRefresh />
          </div>
          <div>
            <InstrumentSampleSource sample={list[0]} history={history} />
            <FcRefresh />
          </div>
          <div>
            <InstrumentSampleSource sample={list[0]} history={history} />
            <FcRefresh />
          </div>
        </div>
      )}
      <div>
        <button onClick={handleGetEditedWaveSample}>myPreset불러오기</button>
        {myPresetList.map((sample) =>
          <div>
            <InstrumentSampleSource sample={sample} history={history} />
          </div>
        )}
      </div>
    </>
  );
}
