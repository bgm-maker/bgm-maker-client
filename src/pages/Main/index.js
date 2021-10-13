import { useState } from "react";

import InstrumentSampleBox from "../../components/Main/InstrumentSampleBox";
import SequencerBox from "../../components/Main/SequencerBox";
import Player from "../../components/Main/Player";
import Header from "../../components/Main/Header";

export default function MainPage() {
  const [test, setTest] = useState();
  return (
    <div>
      {/* <Header /> */}
      <InstrumentSampleBox />
      <br />
      <SequencerBox setTest={setTest} />
      <Player test={test} />
    </div>
  );
}
