import { useSelector } from "react-redux";
import styled from "styled-components";

import SequencerNoteGroup from "../molecules/SequencerNoteGroup";
import SequencerModulateButtonGroup from "../molecules/SequencerModulateButtonGroup";
import SequencerEffectGroup from "../molecules/SequencerEffectGroup";
import { selectDropZoneCount } from "../../../feature/sequencerDropZoneCountSlice";
import { MODULATE_BUTTON_TYPE } from "../../../constants";


export default function SequencerDropZone() {
  const dropZoneCount = useSelector(selectDropZoneCount);

  return (
    <>
      <StyledDropZoneWrapper>
        {Array.from(Array(dropZoneCount.rowCount)).map((_, index) => (
          <StyledRowLine>
            <SequencerEffectGroup
              dropZoneRowNum={`dropZone${index}`}
            />
            <SequencerNoteGroup
              dropZoneRowNum={`dropZone${index}`}
              isFirstRowLine={index === 0}
            />
          </StyledRowLine>
        ))}
      </StyledDropZoneWrapper>

      <StyledButtonWrapper>
        <SequencerModulateButtonGroup
          name={MODULATE_BUTTON_TYPE.ROW}
        />
        <SequencerModulateButtonGroup
          name={MODULATE_BUTTON_TYPE.NOTE}
        />
      </StyledButtonWrapper>
    </>
  );
};

const StyledDropZoneWrapper = styled.div`
  margin-top: 4vh;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 88.5vw;
  margin-top: 6px;
`;

const StyledRowLine = styled.div`
  display: flex;
  position: relative;
  align-items: flex-end;
`;
