import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

import instrumentsReducer from "./instrumentSlice";
import sequencerSamplesReducer from "./sequencerSamplesSlice";
import showCurrentNoteReducer from "./showCurrentNoteSlice";
import nowPlayingSampleReducer from "./nowPlayingSampleSlice";
import sequencerDropZoneCountReducer from "./sequencerDropZoneCountSlice";

const appReducer = combineReducers({
  instruments: instrumentsReducer,
  sequencerSamples: sequencerSamplesReducer,
  currentNote: showCurrentNoteReducer,
  nowPlayingSample: nowPlayingSampleReducer,
  dropZoneCount: sequencerDropZoneCountReducer,
});

function rootReducer(state, action) {
  if (action.type === "initializeState") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== "production") {
      return getDefaultMiddleware({ serializableCheck: false }).concat(logger);
    }

    return getDefaultMiddleware();
  },
  devTools: process.env.NODE_ENV !== "production",
});
