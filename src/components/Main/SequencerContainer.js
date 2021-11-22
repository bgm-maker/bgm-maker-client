import { useState, useEffect } from "react";
import styled from "styled-components";

import SequencerDropZone from "./SequencerDropZone";
import {
  INITIAL_DROP_ZONE_ROW_COUNT,
  INITIAL_DROP_ZONE_NOTE_COUNT
} from "../../constants";

export default function SequencerContainer({ setTime }) {
  const [dropZoneRowCount, setDropZoneRowCount] = useState(INITIAL_DROP_ZONE_ROW_COUNT);
  const [dropZoneNoteCount, setDropZoneNoteCount] = useState(INITIAL_DROP_ZONE_NOTE_COUNT);

  function handleExtendDropZoneNote(event) {
    if (event.target.value === "+") {
      setDropZoneNoteCount((prev) => prev + 4);
      return;
    } else {
      if (dropZoneNoteCount === INITIAL_DROP_ZONE_NOTE_COUNT) {
        alert("더이상 줄일 수 없습니다");
        return;
      }

      setDropZoneNoteCount((prev) => prev - 4);
    }
  }

  function handleExtendDropZoneRow(event) {
    if (event.target.value === "+") {
      setDropZoneRowCount((prev) => prev + 1);
      return;
    } else {
      if (dropZoneRowCount === INITIAL_DROP_ZONE_ROW_COUNT) {
        alert("더이상 줄일 수 없습니다");
        return;
      }

      setDropZoneRowCount((prev) => prev - 1);
    }
  }

  useEffect(() => {
    setTime(dropZoneNoteCount);
  }, [dropZoneNoteCount]);

  return (
    <SequencerZoneWrapper>
      <div>
        <SequencerRowLine>
          {Array.from(Array(dropZoneRowCount)).map((_, index) => {

            return (
              <SequencerDropZone
                key={index}
                dropZoneRowNum={`dropZone${index}`}
                isFirstDropZone={index === 0}
                dropZoneNoteCount={dropZoneNoteCount}
              />
            );
          })}
        </SequencerRowLine>
        <ModulateRowLineButton>
          <Button value="+" onClick={handleExtendDropZoneRow} rowLine>+</Button>
          <Button value="-" onClick={handleExtendDropZoneRow} rowLine>-</Button>
        </ModulateRowLineButton>
      </div>
      <ModulateNoteButton>
        <Button value="+" onClick={handleExtendDropZoneNote}>+</Button>
        <Button value="-" onClick={handleExtendDropZoneNote}>-</Button>
      </ModulateNoteButton>
    </SequencerZoneWrapper>
  );
}

const SequencerZoneWrapper = styled.div`
  display: flex;
`;

const SequencerRowLine = styled.div`
  margin: 3px;
  margin-top: 12px;
  width: 1152px;
  overflow-x: auto;
`;

const ModulateNoteButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

const ModulateRowLineButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 0 -750px
`;

const Button = styled.button`
  width: ${(props) => {
    if (props.rowLine) {
      return "40px";
    }
    return "24px";
  }};
  height: ${(props) => {
    if (props.rowLine) {
      return "24px";
    }
    return "143px";
  }};
  margin: 5px;
`;
