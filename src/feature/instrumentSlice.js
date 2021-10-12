import { createSlice } from "@reduxjs/toolkit";
import * as Tone from "tone";

import { INSTRUMENT_URLS } from "../constants/s3Config";

const initialState = {
  base: {
    chord: [],
    bass: [],
    drum: [],
    effect: [],
  },
  extend: {
  },
};

const instrumentsSlice = createSlice({
  name: "instruments",
  initialState,
  reducers: {
    getInstruments: (state, action) => {
      const selectedInstruments = action.payload.selectedInstruments;
      const selectedMood = action.payload.selectedMood.toLowerCase();

      Object.entries(selectedInstruments).forEach(([instrument, list]) => {
        list.forEach((number) => {
          const sample = new Tone.Player(`${INSTRUMENT_URLS.BASE_URL}${instrument}_${selectedMood}_${number}.wav`);
          sample.toDestination();

          state.base[instrument].push(sample);
        });
      });
    },
  },
});

export const { getInstruments } = instrumentsSlice.actions;

export default instrumentsSlice.reducer;

export const selectInstrument = (state) => state.instruments.base;
