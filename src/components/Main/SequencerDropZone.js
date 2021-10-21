import EffectZone from "./EffectZone";
import SequencerNote from "./SequencerNote";

export default function SequencerDropZone({ dropZoneRowNum, isFirstDropZone, dropZoneNoteCount }) {

  return (
    <div style={{ display: "flex" }}>
      <EffectZone dropZoneRowNum={dropZoneRowNum} isFirstDropZone={isFirstDropZone} />
      {
        Array.from(Array(dropZoneNoteCount)).map((_, index) => (
          <div>
            {isFirstDropZone && <span>{index + 1}</span>}
            <div style={{ display: "flex" }}>
              <SequencerNote measure={index} quarter={1} dropZoneRowNum={dropZoneRowNum} />
              <SequencerNote measure={index} quarter={2} dropZoneRowNum={dropZoneRowNum} />
              <SequencerNote measure={index} quarter={3} dropZoneRowNum={dropZoneRowNum} />
              <SequencerNote measure={index} quarter={4} dropZoneRowNum={dropZoneRowNum} />
            </div>
          </div>
        ))
      }
    </div>
  );
}
