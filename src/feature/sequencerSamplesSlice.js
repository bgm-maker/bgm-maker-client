import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allSamples: [],
};

const sequencerSamplesSlice = createSlice({
  name: "sequencerSamples",
  initialState,
  reducers: {
    addSequencerSamples: (state, action) => {
      const { sampler, dropZoneRowNum } = action.payload;

      if (!state.hasOwnProperty(dropZoneRowNum)) {
        state[dropZoneRowNum] = [];
      }

      state[dropZoneRowNum].push(sampler);
      state.allSamples.push(sampler);
    },
    initializeSequencerSamples: (state, action) => {
      for (const key in state) {
        state[key].length = 0;
      }
    },
  },
});

export const { addSequencerSamples, initializeSequencerSamples } = sequencerSamplesSlice.actions;

export default sequencerSamplesSlice.reducer;

export const selectSequencerSamples = (state) => state.samples;
