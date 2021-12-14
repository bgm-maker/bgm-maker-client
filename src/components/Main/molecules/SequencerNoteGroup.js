import { useSelector } from "react-redux";
import styled from "styled-components";

import SequencerNote from "../atoms/SequencerNote";
import { selectDropZoneCount } from "../../../feature/sequencerDropZoneCountSlice";

export default function SequencerNoteGroup({ isFirstRowLine, dropZoneRowNum }) {
  const dropZoneCount = useSelector(selectDropZoneCount);

  return (
    <StyledSingleRowLine>
      {Array.from(Array(dropZoneCount.noteCount)).map((_, index) => (
        <StyledMeasure>
          <SequencerNote measure={index} quarter={1} dropZoneRowNum={dropZoneRowNum} />
          <SequencerNote measure={index} quarter={2} dropZoneRowNum={dropZoneRowNum} />
          <SequencerNote measure={index} quarter={3} dropZoneRowNum={dropZoneRowNum} />
          <SequencerNote measure={index} quarter={4} dropZoneRowNum={dropZoneRowNum} />
        </StyledMeasure>
      ))}
    </StyledSingleRowLine>
  );
};

const StyledSingleRowLine = styled.div`
  display: flex;
  position: absolute;
  width: 70vw;
  left: 15vw;
`;

const StyledMeasure = styled.div`
  display: flex;
`;
