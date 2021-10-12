import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const sequencerSamplesSlice = createSlice({
  name: "sequencerSamples",
  initialState,
  reducers: {
    addSequencerSamples: (state, action) => {
      const sample = action.payload

      state.push(sample);
    },
    initializeSequencerSamples: (state, action) => {
      state.length = 0;
    },
  },
});

export const { addSequencerSamples, initializeSequencerSamples } = sequencerSamplesSlice.actions;

export default sequencerSamplesSlice.reducer;

export const selectSequencerSamples = (state) => state.samples;
