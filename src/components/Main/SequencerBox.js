import * as Tone from "tone";

import SequencerDropZone from "./SequencerDropZone";
import Player from "./Player";

export default function SequencerBox() {
  const arr = [1, 2, 3, 4, 5];

  return (
    <>
      {
        arr.map((num, index) =>
          <div style={{ display: "flex" }}>
            <div style={{ width: 100, height: 70, borderStyle: "solid" }}>이건 effect 창이 될거임</div>
            <SequencerDropZone />
            <SequencerDropZone />
            <SequencerDropZone />
            <SequencerDropZone />
            <SequencerDropZone />
            <SequencerDropZone />
            <SequencerDropZone />
            <SequencerDropZone />
          </div>
        )
      }
      <Player />
    </>
  );
}
