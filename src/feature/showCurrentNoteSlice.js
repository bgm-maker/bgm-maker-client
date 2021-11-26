import { createSlice } from "@reduxjs/toolkit";

const initialState = "0:0";

const showCurrentNoteSlice = createSlice({
  name: "showCurrentNote",
  initialState,
  reducers: {
    updateCurrentNote: (state, action) => {
      let [measure, quarter] = state.split(":");
      measure = Number(measure);
      quarter = Number(quarter);

      if (quarter === 4) {
        measure = measure + 1;
        quarter = 0;
      }
      quarter += 1;
      state = `${measure}:${quarter}`;

      return state;
    },
    initCurrentNote: (state, action) => {
      return initialState;
    },
  },
});

export const { updateCurrentNote, initCurrentNote } = showCurrentNoteSlice.actions;

export default showCurrentNoteSlice.reducer;

export const selectCurrentNote = (state) => state.currentNote;
