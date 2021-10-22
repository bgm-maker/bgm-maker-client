import { createSlice, current } from "@reduxjs/toolkit";
import * as Tone from "tone";

import { SAMPLE_URLS } from "../constants/s3Config";

const initialState = {
  base: {
    chord: [],
    bass: [],
    rhythm: [],
    effect: [],
  },
  selectedRandomNum: {
    mood: "",
    chord: [],
    bass: [],
    rhythm: [],
    effect: [],
  },
  editedWaveSample: [],
  recorder: null,
};

const instrumentsSlice = createSlice({
  name: "instruments",
  initialState,
  reducers: {
    getInstruments: (state, action) => {
      const selectedInstruments = action.payload.selectedInstruments;
      const selectedMood = action.payload.selectedMood.toLowerCase();
      state.selectedRandomNum.mood = selectedMood;

      const recorder = new Tone.Recorder();
      state.recorder = recorder;

      Object.entries(selectedInstruments).forEach(([instrument, list]) => {
        state.selectedRandomNum[instrument].push(...list);

        list.forEach((number) => {
          const url = `${SAMPLE_URLS.BASE_URL}${instrument}_${selectedMood}_${number}.wav`;
          const sample = new Tone.Player(url);
          sample.connect(recorder);
          sample.toDestination();
          state.base[instrument].push([sample, url]);
        });
      });

    },
    saveEditedWaveSampled: (state, action) => {
      const { wave, url } = action.payload;
      state.editedWaveSample.push([wave, url]);
    },
    refreshInstrument: (state, action) => {
      const { reselectedNums, instType } = action.payload;
      const { index, currentRandomNums } = reselectedNums;

      const mood = current(state).selectedRandomNum.mood;
      const number = currentRandomNums.pop();
      const url = `${SAMPLE_URLS.BASE_URL}${instType}_${mood}_${number}.wav`;
      const player = new Tone.Player(url).toDestination();

      state.base[instType].splice(index, 1, [player, url]);
      state.selectedRandomNum[instType].push(number);
    },
  },
});

export const {
  getInstruments,
  saveEditedWaveSampled,
  refreshInstrument,
} = instrumentsSlice.actions;

export default instrumentsSlice.reducer;

export const selectInstrument = (state) => state.instruments.base;

export const selectEditedWaveSample = (state) => state.instruments.editedWaveSample;

export const selectedRandomNum = (state) => state.instruments.selectedRandomNum;

export const selectedRecorder = (state) => state.instruments.recorder;
