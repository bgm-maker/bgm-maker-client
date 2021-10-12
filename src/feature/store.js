import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import instrumentsReducer from "./instrumentSlice";
import sequencerSamplesReducer from "./sequencerSamplesSlice";

export const store = configureStore({
  reducer: {
    instruments: instrumentsReducer,
    samples: sequencerSamplesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== "production") {
      return getDefaultMiddleware({ serializableCheck: false }).concat(logger);
    }

    return getDefaultMiddleware();
  },
  devTools: process.env.NODE_ENV !== "production",
});
