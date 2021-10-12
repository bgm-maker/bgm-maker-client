import InstrumentSampleBox from "../../components/Main/InstrumentSampleBox";
import SequencerBox from "../../components/Main/SequencerBox";
import Player from "../../components/Main/Player";

export default function MainPage() {

  return (
    <div>
      <InstrumentSampleBox />
      <br />
      <SequencerBox />
      <Player />
    </div>
  );
}
