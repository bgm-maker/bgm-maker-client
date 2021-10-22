import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

import instrumentsReducer from "./instrumentSlice";
import sequencerSamplesReducer from "./sequencerSamplesSlice";
import showCurrentNoteReducer from "./showCurrentNoteSlice";

const appReducer = combineReducers({
  instruments: instrumentsReducer,
  samples: sequencerSamplesReducer,
  currentNote: showCurrentNoteReducer,
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
