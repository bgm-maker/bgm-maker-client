import { useState, useEffect } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import styled from "styled-components";

import SequencerDropZone from "./SequencerDropZone";
import {
  INITIAL_DROP_ZONE_ROW_COUNT,
  INITIAL_DROP_ZONE_NOTE_COUNT
} from "../../constants";

export default function SequencerBox({ setTest }) {
  const [sequencerRowCount, setSequencerRowCount] = useState(INITIAL_DROP_ZONE_ROW_COUNT);
  const [dropZoneNoteCount, setDropZoneNoteCount] = useState(INITIAL_DROP_ZONE_NOTE_COUNT);

  function handleExtendDropZoneNote(ev) {
    if (ev.target.value === "+") {
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

  function handleExtendDropZoneRow() {
    setSequencerRowCount((prev) => prev + 1);
  }

  useEffect(() => {
    setTest(dropZoneNoteCount);
  }, [dropZoneNoteCount]);

  return (
    <ScrollMenu>
      <SequencerRowLine>
        {Array.from(Array(sequencerRowCount)).map((_, index) => {
          const props = {
            dropZoneRowNum: `dropZone${index}`,
            isFirstDropZone: index === 0,
            dropZoneNoteCount
          }

          return (<SequencerDropZone {...props} />);
        })}
      </SequencerRowLine>
      <ModulateNoteButton>
        {["+", "-"].map((value) =>
          <Button value={value} onClick={handleExtendDropZoneNote}>{value}</Button>
        )}
      </ModulateNoteButton>
    </ScrollMenu >
  );
}

const SequencerRowLine = styled.div`
  margin: 3px;
  margin-top: 12px;
`;

const ModulateNoteButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 31px;
`;

const Button = styled.button`
  width: 24px;
  height: 148px;
`;
