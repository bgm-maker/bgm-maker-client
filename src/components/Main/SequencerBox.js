import SequencerDropZone from "./SequencerDropZone";

import { SEQUENCER_DROP_ZONE_COUNT } from "../../constants";

export default function SequencerBox() {

  return (
    <div>
      {Array.from(Array(SEQUENCER_DROP_ZONE_COUNT)).map((_, index) => {
        const props = {
          dropZoneRowNum: `dropZone${index}`,
          isFirstDropZone: index === 0,
        }

        return (
          <SequencerDropZone {...props} />
        );
      })}
    </div>
  );
}
