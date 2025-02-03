import { useFetchWeatherDataQuery } from "../app/fetchWeatherDataSlice";

export default function WeatherFetcher({ coords }) {
  const { lat, lon } = coords || {};
  const { data, error, isLoading } = useFetchWeatherDataQuery(
    { lat, lon },
    {
      skip: !coords,
    }
  );

  return (
    <div>
      {isLoading && <p className="text-blue-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}
      {data && (
        <div>
          <p>Temperature: {data.current.temperature_2m} °F</p>
          <p>Precipitation: {data.current.precipitation} inches</p>
          <p>Wind Speed: {data.current.wind_speed_10m} mph</p>
        </div>
      )}
    </div>
  );
}
