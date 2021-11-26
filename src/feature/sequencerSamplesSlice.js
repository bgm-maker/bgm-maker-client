import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const sequencerSamplesSlice = createSlice({
  name: "sequencerSamples",
  initialState,
  reducers: {
    addSequencerSamples: (state, action) => {
      const { sampleInfo, dropZoneRowNum, time } = action.payload;

      if (!state.hasOwnProperty(dropZoneRowNum)) {
        state[dropZoneRowNum] = {};
      }
      state[dropZoneRowNum][time] = sampleInfo;
    },
    removeSequencerSample: (state, action) => {
      const { dropZoneRowNum, time } = action.payload;

      delete state[dropZoneRowNum][time];
    },
    initializeSequencerSamples: (state, action) => {
      return initialState;
    },
  },
});

export const {
  addSequencerSamples,
  removeSequencerSample,
  initializeSequencerSamples
} = sequencerSamplesSlice.actions;

export default sequencerSamplesSlice.reducer;

export const selectSequencerSamples = (state) => state.sequencerSamples;
