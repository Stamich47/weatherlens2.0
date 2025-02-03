import { configureStore } from "@reduxjs/toolkit";
import { fetchCoordsApi } from "./fetchCoordsSlice";
import { fetchWeatherDataApi } from "./fetchWeatherDataSlice";

export const store = configureStore({
  reducer: {
    [fetchCoordsApi.reducerPath]: fetchCoordsApi.reducer,
    [fetchWeatherDataApi.reducerPath]: fetchWeatherDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(fetchCoordsApi.middleware)
      .concat(fetchWeatherDataApi.middleware),
});
