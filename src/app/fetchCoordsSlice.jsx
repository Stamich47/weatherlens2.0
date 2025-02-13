import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const GEO_KEY = import.meta.env.VITE_GEO_API;

export const fetchCoordsApi = createApi({
  reducerPath: "geocodeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://geocode.maps.co/` }),
  endpoints: (builder) => ({
    fetchCoords: builder.query({
      query: (city) => `search?q=${city}&api_key=${GEO_KEY}`,
    }),
  }),
});

export const { useFetchCoordsQuery } = fetchCoordsApi;
