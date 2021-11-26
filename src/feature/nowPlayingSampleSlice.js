import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sample: {},
  sampleUrl: "",
  isPlaying: false,
};

const nowPlayingSampleSlice = createSlice({
  name: "nowPlayingSample",
  initialState,
  reducers: {
    setNowPlayingSample: (state, action) => {
      state.sample = action.payload.sample;
      state.sampleUrl = action.payload.sampleUrl;
      state.isPlaying = true;
    },
    initNowPlayingSample: (state, action) => {
      return initialState;
    },
  },
});

export const { setNowPlayingSample, initNowPlayingSample } = nowPlayingSampleSlice.actions;

export default nowPlayingSampleSlice.reducer;

export const selectNowPlayingSample = (state) => state.nowPlayingSample;
