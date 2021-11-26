import { useSelector } from "react-redux";
import styled from "styled-components";

import SequencerMeasureCount from "../atoms/SequencerMeasureCount";
import SequencerNote from "../atoms/SequencerNote";
import { selectDropZoneCount } from "../../../feature/sequencerDropZoneCountSlice";

export default function SequencerNoteGroup({ isFirstRowLine, dropZoneRowNum }) {
  const dropZoneCount = useSelector(selectDropZoneCount);

  return (
    <StyledSingleRowLine>
      {Array.from(Array(dropZoneCount.noteCount)).map((_, index) => (
        <div>
          {isFirstRowLine && <SequencerMeasureCount>{index + 1}</SequencerMeasureCount>}
          <StyledMeasure>
            <SequencerNote measure={index} quarter={1} dropZoneRowNum={dropZoneRowNum} />
            <SequencerNote measure={index} quarter={2} dropZoneRowNum={dropZoneRowNum} />
            <SequencerNote measure={index} quarter={3} dropZoneRowNum={dropZoneRowNum} />
            <SequencerNote measure={index} quarter={4} dropZoneRowNum={dropZoneRowNum} />
          </StyledMeasure>
        </div>
      ))}
    </StyledSingleRowLine>
  );
};

const StyledSingleRowLine = styled.div`
  display: flex;
  width: 993px;
`;

const StyledMeasure = styled.div`
  display: flex;
`;
