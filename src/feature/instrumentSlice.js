import { createSlice, current } from "@reduxjs/toolkit";
import * as Tone from "tone";

import { SAMPLE_URLS } from "../constants/s3Config";

const initialState = {
  instrumentSamples: {
    chord: [],
    bass: [],
    rhythm: [],
    effect: [],
  },
  editedSamples: [],
  selectedMood: "",
  selectedRandomNum: {
    chord: [],
    bass: [],
    rhythm: [],
    effect: [],
  },
  recorder: null,
};

const instrumentsSlice = createSlice({
  name: "instruments",
  initialState,
  reducers: {
    createInstrumentSamples: (state, action) => {
      const selectedInstruments = action.payload.selectedInstruments;
      const selectedMood = action.payload.selectedMood.toLowerCase();
      state.selectedMood = selectedMood;

      const recorder = new Tone.Recorder();
      state.recorder = recorder;

      Object.entries(selectedInstruments).forEach(([instrument, list]) => {
        state.selectedRandomNum[instrument].push(...list);

        list.forEach((number) => {
          const sampleUrl = `${SAMPLE_URLS.BASE_URL}${instrument}_${selectedMood}_${number}.wav`;
          const sample = new Tone.Player(sampleUrl);
          sample.connect(recorder);
          sample.toDestination();
          state.instrumentSamples[instrument].push({ sample, sampleUrl });
        });
      });
    },
    saveEditedSample: (state, action) => {
      const { sample, sampleUrl } = action.payload;
      state.editedSamples.push({ sample, sampleUrl });
    },
    refreshInstrument: (state, action) => {
      const { reselectedNums, instType, sample: currentSample } = action.payload;

      const mood = current(state).selectedMood;
      const sampleList = current(state).instrumentSamples[instType];
      const index = sampleList.findIndex((item) => item.sampleUrl === currentSample.sampleUrl)
      const number = reselectedNums.pop();
      const sampleUrl = `${SAMPLE_URLS.BASE_URL}${instType}_${mood}_${number}.wav`;
      const sample = new Tone.Player(sampleUrl).toDestination();

      state.instrumentSamples[instType].splice(index, 1, { sample, sampleUrl });
      state.selectedRandomNum[instType].push(number);
    },
  },
});

export const {
  createInstrumentSamples,
  saveEditedSample,
  refreshInstrument,
} = instrumentsSlice.actions;

export default instrumentsSlice.reducer;

export const selectInstrumentSamples = (state) => state.instruments.instrumentSamples;

export const selectEditedSamples = (state) => state.instruments.editedSamples;

export const selectedRandomNum = (state) => state.instruments.selectedRandomNum;

export const selectedRecorder = (state) => state.instruments.recorder;

export const selectedMood = (state) => state.instruments.selectedMood;
