import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fetchWeatherDataApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.open-meteo.com/v1/" }),
  endpoints: (builder) => ({
    fetchWeatherData: builder.query({
      query: ({ lat, lon }) =>
        `forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`,
    }),
  }),
});

export const { useFetchWeatherDataQuery } = fetchWeatherDataApi;
