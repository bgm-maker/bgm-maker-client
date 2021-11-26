import { createSlice } from "@reduxjs/toolkit";

import { INITIAL_DROP_ZONE_NOTE_COUNT, INITIAL_DROP_ZONE_ROW_COUNT, MODULATE_BUTTON_TYPE } from "../constants";
import { MODULATE_ERROR } from "../constants/error";

const initialState = {
  rowCount: INITIAL_DROP_ZONE_ROW_COUNT,
  noteCount: INITIAL_DROP_ZONE_NOTE_COUNT,
};

const sequencerDropZoneCountSlice = createSlice({
  name: "dropZoneCount",
  initialState,
  reducers: {
    setDropZoneCount: (state, action) => {
      const { name, value } = action.payload;

      switch (name) {
        case MODULATE_BUTTON_TYPE.ROW: {
          if (value === "-") {
            if (state.rowCount === INITIAL_DROP_ZONE_ROW_COUNT) {
              throw new Error(MODULATE_ERROR.CANNOT_MODULATE);
            }
            state.rowCount = state.rowCount - 1;
          }

          if (value === "+") {
            state.rowCount = state.rowCount + 1;
          }
          break;
        }
        case MODULATE_BUTTON_TYPE.NOTE: {
          if (value === "-") {
            if (state.noteCount === INITIAL_DROP_ZONE_NOTE_COUNT) {
              throw new Error(MODULATE_ERROR.CANNOT_MODULATE);
            }
            state.noteCount = state.noteCount - 4;
          }

          if (value === "+") {
            state.noteCount = state.noteCount + 4;
          }
          break;
        }
        default: {
          throw new Error(MODULATE_ERROR.TRY_AGAIN);
        }
      }
    },
  },
});

export const { setDropZoneCount } = sequencerDropZoneCountSlice.actions;

export default sequencerDropZoneCountSlice.reducer;

export const selectDropZoneCount = (state) => state.dropZoneCount;
