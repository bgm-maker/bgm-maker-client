import styled from "styled-components";

import SequencerEffectZone from "./SequencerEffectZone";
import SequencerNote from "./SequencerNote";

export default function SequencerDropZone({ dropZoneRowNum, isFirstDropZone, dropZoneNoteCount }) {

  return (
    <SingleRowLine>
      <SequencerEffectZone dropZoneRowNum={dropZoneRowNum} isFirstDropZone={isFirstDropZone} />
      {
        Array.from(Array(dropZoneNoteCount)).map((_, index) => (
          <div key={index}>
            {isFirstDropZone && <MeasureCount>{index + 1}</MeasureCount>}
            <Measure>
              <SequencerNote measure={index} quarter={1} dropZoneRowNum={dropZoneRowNum} />
              <SequencerNote measure={index} quarter={2} dropZoneRowNum={dropZoneRowNum} />
              <SequencerNote measure={index} quarter={3} dropZoneRowNum={dropZoneRowNum} />
              <SequencerNote measure={index} quarter={4} dropZoneRowNum={dropZoneRowNum} />
            </Measure>
          </div>
        ))
      }
    </SingleRowLine>
  );
}

const SingleRowLine = styled.div`
  display: flex;
`;

const Measure = styled.div`
  display: flex;
  top: 3px;
  bottom: 3px;
`;

const MeasureCount = styled.div`
  margin-left: 8px;
`;
